import {Axios} from "./Axios";
import {Code, Human, QueryItem, Question} from "../state/AppModel";
import {FilteredProps} from "./PropConfig";
import {QueryCreators} from "./QueryCreators";
import {parseHumanInfoResponse} from "./QueryReponseParsers";


export class Wikidata {
    static async getHumans(): Promise<Code[]>{
        const humansQueryResults = await Axios.sendWikidataQuery(QueryCreators.humansIds())
        return humansQueryResults.results.bindings.map((binding: { item: { value: string } }) => {
            return getCodeFromURL(binding.item.value)
        })
    }

    static async getSelectedHumanInfo(humanId: string, props: Code[]): Promise<Human> {
        const humansIdQueryResults = await Axios.sendWikidataQuery(QueryCreators.specifiedHumanProps(humanId, props))
        return parseHumanInfoResponse(humanId, humansIdQueryResults.results.bindings[0], props)
    }

    static async getAndFilterHumanPropsById(humanId: string): Promise<Code[]> {
        const allPropsResult = await Axios.sendWikidataQuery(QueryCreators.allHumanProps(humanId))
        const allProps: string[] = allPropsResult.results.bindings.map((binding: { property: { value: string } }) => {
            return getCodeFromURL(binding.property.value)
        })
        const uniqueProps = new Set(allProps)

        const labelsQueryResult = await Axios.sendWikidataQuery(QueryCreators.valuesLabelsQueryCreator(Array.from(uniqueProps)))
        const query = labelsQueryResult.results.bindings[0]

        return Object.keys(query).filter(key => {
            const label = query[key].value.toLowerCase()
            const isNotIdProp = !label.includes("id")
            const isNotFiltered = !FilteredProps.includes(key)
            return isNotFiltered && isNotIdProp
        })
    }

    static async getPropertyInfo(propertyId: string): Promise<Question> {
        const propertyInfoResult = await Axios.sendWikidataQuery(QueryCreators.propertyInfo(propertyId))
        const {description, label} = propertyInfoResult.results.bindings[0]

        return {
            code: propertyId,
            description: description.value,
            label: label.value,
        }
    }

    static async getPropertyAnswers(propertyId: string) {
        const propertyInfoResult = await Axios.sendWikidataQuery(QueryCreators.questionAnswersPropositions(propertyId))
        const labels = propertyInfoResult.results.bindings.map((binding: { prop: { value: string; }; }) => {
            return getCodeFromURL(binding.prop.value)
        })
        const labelsQueryResult = await Axios.sendWikidataQuery(QueryCreators.valuesLabelsQueryCreator(labels))
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
}

export function getCodeFromURL(url: string) {
    return url.split("/").slice(-1).pop()
}
