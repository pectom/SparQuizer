import {useQuery} from "react-query";
import {Wikidata} from "../api/wikidata";
import {Code, Human, QueryItem} from "../state/AppModel";

export const humansQuery = `
    SELECT ?item WHERE {
      ?item wdt:P106 wd:Q937857.
      ?item wdt:P18 ?img.
      ?item rdfs:label "Cristiano Ronaldo"@en
    }
    LIMIT 10
    `
export const BaseHumanProps = {
    "img": "P18",
    "country": "P27",
    "dateOfBirth": "P569",
    "occupation": "P106",
}
export const ExtendedHumanProps = {
    "numberOfChildren": "P1971",
    "pseudonym": "P742",
    "awards": "P166",
    "convicted": "P1399",
}

const HumanProperties = {
    ...BaseHumanProps,
    ...ExtendedHumanProps
}

const headerName = (name: string): string => {
    return `(concat('[',group_concat(distinct ?${name};separator=','),']') as ?${name})`
}

const propertyWithLabel = (name: string): string => {
    return `${headerName(name)} ${headerName(`${name}Label`)}`
}
const queryCreator = (id: string) => {
    const headers = Object.keys(HumanProperties).reduce((previousValue, currentValue) => {
        return `${previousValue} ${propertyWithLabel(currentValue)}`
    }, "?name ")

    const properties = Object.entries(HumanProperties).reduce((previousValue, currentValue) => {
        return `${previousValue} wd:${id} wdt:${currentValue[1]} ?${currentValue[0]}.`
    }, "")

    const groupBy = "?name "

    const labels = Object.keys(HumanProperties).reduce((previousValue, currentValue) => {
        return `${previousValue} ?${currentValue} rdfs:label ?${currentValue}Label.`
    }, `wd:${id} rdfs:label ?name.`)

    return (
        `
        SELECT ${headers} WHERE {
        ${properties}
        SERVICE wikibase:label {
            bd:serviceParam wikibase:language "en".
            ${labels}            
        }
        } GROUP BY ${groupBy}
    `
    )
}

const humanInfoQuery = (id: string) => queryCreator(id)

const propertyInfoQuery = (id: string) =>
    `
        SELECT *
        WHERE {
             SERVICE wikibase:label { bd:serviceParam wikibase:language "en".
                  wd:${id} rdfs:label         ?label.
                  wd:${id} schema:description ?description.
              }
        }
    `

export interface QueryResult {
    [key: string]: {
        type: string
        value: string
    }
}

export function parseResponse(id: string, data: QueryResult): Human {
    let human: Human = {
        "name": {
            property: {
                code: id,
                label: "name",
            },
            values: [
                {
                    code: id,
                    label: data.name.value
                }
            ]
        }
    }
    Object.entries(HumanProperties).forEach(propItem => {
        const codes = data[propItem[0]].value.slice(1, data[propItem[0]].value.length - 1).split(",") as string[]
        const labels = data[`${propItem[0]}Label`].value.slice(1, data[`${propItem[0]}Label`].value.length - 1).split(",") as string[]
        const humanValue: QueryItem[] = []
        codes.forEach((link, index) => {
            let label = labels[index]
            let queryItem;
            if (link !== label) {
                queryItem = {
                    code: getCodeFromURL(link),
                    label
                }
            } else {
                if(propItem[0].includes("date")){
                    label = new Date(label).toISOString().slice(0,10);
                }
                queryItem = {
                    label
                }
            }
            humanValue.push(queryItem)
        })
        human[propItem[0]] = {
            property: {
                code: propItem[1],
                label: propItem[0]
            },
            values: humanValue
        }
    })

    return human
}

export async function getHumans(): Promise<Code[]>{
    const humansQueryResults = await Wikidata.sendQuery(humansQuery)
    return humansQueryResults.results.bindings.map((binding: {item: {value: string}}) => {
        return getCodeFromURL(binding.item.value)
    })
}

export function useHumanById(humanId: string) {
    return useQuery(humanId && ['human', humanId], () =>
        Wikidata.sendQuery(humanInfoQuery(humanId))
    )
}

export function usePropertyInfo(propertyId: string){
    return useQuery(propertyId && ['property', propertyId], () =>
        Wikidata.sendQuery(propertyInfoQuery(propertyId))
    )
}

export function getCodeFromURL(url: string){
    return url.split("/").slice(-1).pop()
}
