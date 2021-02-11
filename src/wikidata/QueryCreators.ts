import {Code} from "../state/AppModel";
import {BaseHumanProps, HumansProfessions} from "./PropConfig";

export class QueryCreators {
    private static humanIdsLimit = 1000;
    private static humanPropsLimit = 500;
    private static answersLimit = 20;

    static humansIds() {
        const professions = HumansProfessions.reduce((previousValue, currentValue) => {
            return `${previousValue} wd:${currentValue}`
        }, "")

        const props = BaseHumanProps.reduce((previousValue, currentValue) => {
            return `${previousValue} ?item wdt:${currentValue} ?${currentValue}.`
        }, "")

        return `
    SELECT DISTINCT ?item WHERE {
      VALUES ?occupation {${professions}}.
      ${props}
    }Limit ${this.humanIdsLimit}
    `
    }

    static propertyInfo(propId: Code) {
        return (
            `
        SELECT *
        WHERE {
             SERVICE wikibase:label { bd:serviceParam wikibase:language "en".
                  wd:${propId} rdfs:label         ?label.
                  wd:${propId} schema:description ?description.
              }
        }
    `)
    }

    static questionAnswersPropositions(propCode: Code) {
        return (`
    SELECT ?prop (COUNT(?prop) as ?count) WHERE {
        ?item wdt:${propCode} ?prop.
    }
    GROUP BY ?prop
    ORDER BY DESC(?count) 
    LIMIT ${this.answersLimit}
    `)
    }

    static valuesLabelsQueryCreator(valueCodes: Code[]) {
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

    static allHumanProps(id: Code) {
        return `
    SELECT ?property WHERE {
          wd:${id} ?property ?val.
         ?property rdf:type ?Type. 
    }
    Limit ${this.humanPropsLimit}
    `
    }

    private static headerName(name: string): string {
        return `(concat('[',group_concat(distinct ?${name};separator=','),']') as ?${name})`
    }


    private static propertyWithLabel(name: string): string {
        return `${this.headerName(name)} ${this.headerName(`${name}Label`)} ${this.headerName(`${name}Value`)}`
    }

    static specifiedHumanProps(humanId: Code, props: Code[]){
        const headers = props.reduce((previousValue, currentValue) => {
            return `${previousValue} ${this.propertyWithLabel(currentValue)}`
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
}
