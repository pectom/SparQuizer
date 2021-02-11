import {Axios} from "./Axios";
import {Code, Human, QueryItem, Question} from "../state/AppModel";
import {BaseHumanProps, ExtendedHumanProps, FilteredProps} from "./PropConfig";
import {
    allHumanPropsQueryCreator,
    answersQueryCreator,
    humanQueryCreator,
    humansIdsQueryCreator,
    propertyInfoQueryCreator,
    valuesLabelsQueryCreator
} from "./QueryCreators";
import {parseHumanInfoResponse} from "./QueryReponseParsers";
import _ from "lodash";


export function selectQuestionProp(allProps: Code[]): Code {
    const props = _.shuffle(allProps)
    for (let i = 0; i < props.length; i++) {
        if (ExtendedHumanProps.includes(props[i])) {
            return props[i]
        }
    }
    for (let i = 0; i < props.length; i++) {
        if (!BaseHumanProps.includes(props[i])) {
            return props[i]
        }
    }
    return props[0]
}

export async function getHumans(): Promise<Code[]>{
    const humansQueryResults = await Axios.sendWikidataQuery(humansIdsQueryCreator())
    return humansQueryResults.results.bindings.map((binding: { item: { value: string } }) => {
        return getCodeFromURL(binding.item.value)
    })
}

export async function getHumanById(humanId: string, props: Code[]): Promise<Human> {
    const humansIdQueryResults = await Axios.sendWikidataQuery(humanQueryCreator(humanId, props))
    return parseHumanInfoResponse(humanId, humansIdQueryResults.results.bindings[0], props)
}

export async function getAndFilterHumanPropsById(humanId: string): Promise<Code[]> {
    const allPropsResult = await Axios.sendWikidataQuery(allHumanPropsQueryCreator(humanId))
    const allProps: string[] = allPropsResult.results.bindings.map((binding: { property: { value: string } }) => {
        return getCodeFromURL(binding.property.value)
    })
    const uniqueProps = new Set(allProps)

    const labelsQueryResult = await Axios.sendWikidataQuery(valuesLabelsQueryCreator(Array.from(uniqueProps)))
    const query = labelsQueryResult.results.bindings[0]

    return Object.keys(query).filter(key => {
        const label = query[key].value.toLowerCase()
        const isNotIdProp = !label.includes("id")
        const isNotFiltered = !FilteredProps.includes(key)
        return isNotFiltered && isNotIdProp
    })
}

export async function getPropertyInfo(propertyId: string): Promise<Question> {
    const propertyInfoResult = await Axios.sendWikidataQuery(propertyInfoQueryCreator(propertyId))
    const {description, label} = propertyInfoResult.results.bindings[0]

    return {
        code: propertyId,
        description: description.value,
        label: label.value,
    }
}

export async function getPropertyAnswers(propertyId: string) {
    const propertyInfoResult = await Axios.sendWikidataQuery(answersQueryCreator(propertyId))
    const labels = propertyInfoResult.results.bindings.map((binding: { prop: { value: string; }; }) => {
        return getCodeFromURL(binding.prop.value)
    })
    const labelsQueryResult = await Axios.sendWikidataQuery(valuesLabelsQueryCreator(labels))
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
