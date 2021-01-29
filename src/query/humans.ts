import {useQuery} from "react-query";
import {Wikidata} from "../api/wikidata";
import {PropertyItem, QueryItem} from "../model/app-model";

const humansQuery = `
        SELECT ?item ?itemLabel WHERE {
          ?item wdt:P106 wd:Q2736.
          ?item wdt:P18 ?img 
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],nl". }
        }
        LIMIT 10
        
    `

const HumanProperties = {
    "img": "P18",
    "sex": "P21",
    "county": "P27",
    "pseudonym": "P742",
    "dateOfBirth": "P569",
    "placeOfBirth": "P19",
    "numberOfChildren": "P1971",
    "language": "P103",
    "occupation": "P106",
    "awards": "P166",
    "convicted": "P1399",
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

    debugger

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

export interface Human {
    [key: string]: PropertyItem
}

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
    delete data["name"]
    Object.entries(HumanProperties).forEach(propItem => {
        const codes = data[propItem[0]].value.slice(1, data[propItem[0]].value.length - 1).split(",") as string[]
        const labels = data[`${propItem[0]}Label`].value.slice(1, data[`${propItem[0]}Label`].value.length - 1).split(",") as string[]
        const humanValue: QueryItem[] = []
        codes.forEach((link, index) => {
            const label = labels[index]
            let queryItem;
            if (link !== label) {
                const code = link.split("/").slice(-1).pop()
                queryItem = {
                    code,
                    label
                }
            } else {
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


export function useAllHumansIds() {
    return useQuery('humans', () =>
        Wikidata.sendQuery(humansQuery)
    )
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

