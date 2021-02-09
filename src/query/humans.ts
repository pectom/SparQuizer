import {Wikidata} from "../api/wikidata";
import {Code, Human, QueryItem, Question} from "../state/AppModel";

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

export const BaseHumanProps = [
    "P18", //"img",
    "P27", //"country",
    "P569",  //"dateOfBirth",
    "P106",  //"occupation",
]

export const ExtendedHumanProps = [
    "P1971",  //"numberOfChildren",
    "P742", //"pseudonym",
    "P166", //"awards",
    "P1399",  //"convicted",
]

export function getFunctionProp(allProps: Code[]) {
    for (var i = 0; i < allProps.length; i++) {
        if (ExtendedHumanProps.includes(allProps[i])) {
            return allProps[i]
        }
    }
    return allProps[0]
}

const headerName = (name: string): string => {
    return `(concat('[',group_concat(distinct ?${name};separator=','),']') as ?${name})`
}

const propertyWithLabel = (name: string): string => {
    return `${headerName(name)} ${headerName(`${name}Label`)} ${headerName(`${name}Value`)}`
}

const queryCreator = (id: string, props: Code[]) => {
    const headers = props.reduce((previousValue, currentValue) => {
        return `${previousValue} ${propertyWithLabel(currentValue)}`
    }, "?name ")

    const properties = props.reduce((previousValue, currentValue) => {
        return `${previousValue} wd:${id} wdt:${currentValue} ?${currentValue}.`
    }, "")

    const groupBy = "?name "

    const labels = props.reduce((previousValue, currentValue) => {
        const label = `wd:${currentValue} rdfs:label ?${currentValue}Label.`
        const value = `?${currentValue} rdfs:label ?${currentValue}Value.`
        return `${previousValue} ${label} ${value}`
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

const humanInfoQuery = (id: string, props: Code[]) => queryCreator(id, props)

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

export function parseResponse(id: string, data: QueryResult, props: Code[]): Human {
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
    props.forEach(propItem => {
        const codes = data[`${propItem}`].value.slice(1, data[`${propItem}`].value.length - 1).split(",") as string[]
        const values = data[`${propItem}Value`].value.slice(1, data[`${propItem}Value`].value.length - 1).split(",") as string[]
        const label = (data[`${propItem}Label`].value.slice(1, data[`${propItem}Label`].value.length - 1).split(",") as string[])[0]
        const humanValue: QueryItem[] = []
        codes.forEach((link, index) => {
            let valueLabel = values[index]
            let queryItem;
            if (link !== valueLabel) {
                queryItem = {
                    code: getCodeFromURL(link),
                    label: valueLabel
                }
            } else {
                if (`${propItem}Value`.includes("date")) {
                    valueLabel = new Date(valueLabel).toISOString().slice(0, 10);
                }
                queryItem = {
                    label: valueLabel
                }
            }
            humanValue.push(queryItem)
        })
        human[propItem] = {
            property: {
                code: propItem,
                label: label
            },
            values: humanValue
        }
    })
    debugger
    return human
}

export async function getHumans(): Promise<Code[]>{
    const humansQueryResults = await Wikidata.sendQuery(humansQuery)
    return humansQueryResults.results.bindings.map((binding: { item: { value: string } }) => {
        return getCodeFromURL(binding.item.value)
    })
}

export async function getHumanById(humanId: string, props: Code[]): Promise<Human> {
    const humansIdQueryResults = await Wikidata.sendQuery(humanInfoQuery(humanId, props))
    return parseResponse(humanId, humansIdQueryResults.results.bindings[0], props)
}

export async function getAllHumanPropsById(humanId: string): Promise<Code[]> {
    const allPropsResult = await Wikidata.sendQuery(allHumanProps(humanId))
    const allProps: string[] = allPropsResult.results.bindings.map((binding: { property: { value: string } }) => {
        return getCodeFromURL(binding.property.value)
    })
    const uniqueProps = new Set(allProps)
    return Array.from(uniqueProps)
}

export async function getPropertyInfo(propertyId: string): Promise<Question> {
    const propertyInfoResult = await Wikidata.sendQuery(propertyInfoQuery(propertyId))
    const {description, label} = propertyInfoResult.results.bindings[0]
    return {
        code: propertyId,
        description: description.value,
        label: label.value,
    }
}

export function getCodeFromURL(url: string) {
    return url.split("/").slice(-1).pop()
}
