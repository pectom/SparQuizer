import {Wikidata} from "../api/wikidata";
import {Code, Human, QueryItem, Question} from "../state/AppModel";

export const BaseHumanProps = [
    "P18", //"img",
    "P27", //"country",
    "P569",  //"dateOfBirth",
    "P19", // placeOfBirth
    "P106",  //"occupation",
]

const HumansProfessions: Code[] = [
    "Q33999", //  actor
    "Q36180", //  writer
    "Q177220", //  singer
    "Q901", //  scientist
    "Q937857", //  football player
    "Q3665646", //  basketball plater
]

export const humansQuery = (humansProfessions: Code[] = HumansProfessions, baseHumanProps: Code[] = BaseHumanProps) => {
    const professions = humansProfessions.reduce((previousValue, currentValue) => {
        return `${previousValue} wd:${currentValue}`
    }, "")

    const props = baseHumanProps.reduce((previousValue, currentValue) => {
        return `${previousValue} ?item wdt:${currentValue} ?${currentValue}.`
    }, "")

    return `
    SELECT DISTINCT ?item WHERE {
      VALUES ?occupation {${professions}}.
      ${props}
    }Limit 10
    `
}

const answersQuery = (propCode: Code) => `
    SELECT ?prop (COUNT(?prop) as ?count) WHERE {
        ?item wdt:${propCode} ?prop.
    }
    GROUP BY ?prop
    ORDER BY DESC(?count) 
    LIMIT 10
`

const labelQuery = (propCode: Code, valueCodes: Code[]) => {
    const header = valueCodes.reduce((previousValue, currentValue) => {
        return `${previousValue} ?${currentValue}`
    }, "")
    const labels = valueCodes.reduce((previousValue, currentValue) => {
        return`${previousValue} wd:${currentValue} rdfs:label ?${currentValue}.`
    }, "")

    return `   
    SELECT ${header} WHERE {
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en".
        ${labels}
      }
    }
    `
}


const allHumanProps = (id: string) => `
    SELECT ?property WHERE {
          wd:${id} ?property ?val.
         ?property rdf:type ?Type. 
    }Limit 500
`

export const ExtendedHumanProps = [
    // all
    "P742", //"pseudonym",
    "P1399",  //"convicted",
    "P166", //"awards",
    "P509", // cause of death
    "P69",// educated at
    "P119", // place of burial

    // singer
    "P136", // music genre
    "P1303", // instrument
    "P412", // voice type

    //scientist
    "P1344", // participant in
    "P1441", // present in work
    "P1343", // described at
    "P1066", // student of
    "P184", // doctoral advisor
    "P101", // field of work
    "P463", // member of

    // athlete
    "P54", //club
    "P118" //league
]

export function getFunctionProp(allProps: Code[]): Code {
    for (let i = 0; i < allProps.length; i++) {
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
    return human
}

export async function getHumans(): Promise<Code[]>{
    const humansQueryResults = await Wikidata.sendQuery(humansQuery())
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

export async function getPropertyAnswers(propertyId: string) {
    const propertyInfoResult = await Wikidata.sendQuery(answersQuery(propertyId))
    const labels = propertyInfoResult.results.bindings.map((binding: { prop: { value: string; }; }) => {
        return getCodeFromURL(binding.prop.value)
    })
    const labelsQueryResult = await Wikidata.sendQuery(labelQuery(propertyId, labels))
    const query = labelsQueryResult.results.bindings[0]

    const answers: QueryItem[] = Object.keys(query).map(key =>{
        return {
            code: key,
            label: query[key].value,
            isValidAnswer: false
        }
    })
    return answers
}

export function getCodeFromURL(url: string) {
    return url.split("/").slice(-1).pop()
}
