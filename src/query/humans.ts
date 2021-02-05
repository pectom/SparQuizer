import {useQuery} from "react-query";
import {Wikidata} from "../api/wikidata";
import {Code, Human, QueryItem} from "../state/AppModel";

export const humansQuery = `
    SELECT ?item WHERE {
      ?item wdt:P106 wd:Q937857.
      ?item wdt:P18 ?img.
      ?item rdfs:label "Cristiano Ronaldo"@en
    }
    `

const allHumanProps = (id: string) => `
    SELECT ?property WHERE {
          wd:${id} ?property ?val.
         ?property rdf:type ?Type. 
    }Limit 500
`

export const BaseHumanProps = {
     "P18": "img",
     "P27": "country",
     "P569": "dateOfBirth",
     "P106": "occupation",
}
export const ExtendedHumanProps = {
    "P1971": "numberOfChildren",
    "P742": "pseudonym",
    "P166": "awards",
    "P1399": "convicted",
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
    const headers = Object.values(HumanProperties).reduce((previousValue, currentValue) => {
        return `${previousValue} ${propertyWithLabel(currentValue)}`
    }, "?name ")

    const properties = Object.entries(HumanProperties).reduce((previousValue, currentValue) => {
        return `${previousValue} wd:${id} wdt:${currentValue[0]} ?${currentValue[1]}.`
    }, "")

    const groupBy = "?name "

    const labels = Object.values(HumanProperties).reduce((previousValue, currentValue) => {
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
        const codes = data[propItem[1]].value.slice(1, data[propItem[1]].value.length - 1).split(",") as string[]
        const labels = data[`${propItem[1]}Label`].value.slice(1, data[`${propItem[1]}Label`].value.length - 1).split(",") as string[]
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
                if(propItem[1].includes("date")){
                    label = new Date(label).toISOString().slice(0,10);
                }
                queryItem = {
                    label
                }
            }
            humanValue.push(queryItem)
        })
        human[propItem[1]] = {
            property: {
                code: propItem[0],
                label: propItem[1]
            },
            values: humanValue
        }
    })

    return human
}

export async function getHumans(): Promise<Code[]>{
    const humansQueryResults = await Wikidata.sendQuery(humansQuery)
    return humansQueryResults.results.bindings.map((binding: { item: { value: string } }) => {
        return getCodeFromURL(binding.item.value)
    })
}

export async function getHumanById(humanId: string): Promise<Human> {
    const humansIdQueryResults = await Wikidata.sendQuery(humanInfoQuery(humanId))
    return parseResponse(humanId, humansIdQueryResults.results.bindings[0])
}

export async function getAllHumanPropsById(humanId: string): Promise<Set<string>> {
    const allPropsResult = await Wikidata.sendQuery(allHumanProps(humanId))
    const allProps: string[] = allPropsResult.results.bindings.map((binding: { property: { value: string } }) => {
        return getCodeFromURL(binding.property.value)
    })
    return new Set(allProps)
}

export function usePropertyInfo(propertyId: string) {
    return useQuery(propertyId && ['property', propertyId], () =>
        Wikidata.sendQuery(propertyInfoQuery(propertyId))
    )
}

export function getCodeFromURL(url: string) {
    return url.split("/").slice(-1).pop()
}
