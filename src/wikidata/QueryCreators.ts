import {Code} from "../state/AppModel";
import {BaseHumanProps, HumansProfessions} from "./PropConfig";

export const humansIdsQueryCreator = (humansProfessions: Code[] = HumansProfessions, baseHumanProps: Code[] = BaseHumanProps) => {
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

export const propertyInfoQueryCreator = (id: string) =>
    `
        SELECT *
        WHERE {
             SERVICE wikibase:label { bd:serviceParam wikibase:language "en".
                  wd:${id} rdfs:label         ?label.
                  wd:${id} schema:description ?description.
              }
        }
    `

export const answersQueryCreator = (propCode: Code) => `
    SELECT ?prop (COUNT(?prop) as ?count) WHERE {
        ?item wdt:${propCode} ?prop.
    }
    GROUP BY ?prop
    ORDER BY DESC(?count) 
    LIMIT 10
`

export const valuesLabelsQueryCreator = (valueCodes: Code[]) => {
    const header = valueCodes.reduce((previousValue, currentValue) => {
        return `${previousValue} ?${currentValue}`
    }, "")
    const labels = valueCodes.reduce((previousValue, currentValue) => {
        return `${previousValue} wd:${currentValue} rdfs:label ?${currentValue}.`
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
export const allHumanPropsQueryCreator = (id: string) => `
    SELECT ?property WHERE {
          wd:${id} ?property ?val.
         ?property rdf:type ?Type. 
    }Limit 500
`

const headerName = (name: string): string => {
    return `(concat('[',group_concat(distinct ?${name};separator=','),']') as ?${name})`
}

const propertyWithLabel = (name: string): string => {
    return `${headerName(name)} ${headerName(`${name}Label`)} ${headerName(`${name}Value`)}`
}

export const humanQueryCreator = (humanId: Code, props: Code[]) => {
    const headers = props.reduce((previousValue, currentValue) => {
        return `${previousValue} ${propertyWithLabel(currentValue)}`
    }, "?name ")

    const properties = props.reduce((previousValue, currentValue) => {
        return `${previousValue} wd:${humanId} wdt:${currentValue} ?${currentValue}.`
    }, "")

    const groupBy = "?name "

    const labels = props.reduce((previousValue, currentValue) => {
        const label = `wd:${currentValue} rdfs:label ?${currentValue}Label.`
        const value = `?${currentValue} rdfs:label ?${currentValue}Value.`
        return `${previousValue} ${label} ${value}`
    }, `wd:${humanId} rdfs:label ?name.`)

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
