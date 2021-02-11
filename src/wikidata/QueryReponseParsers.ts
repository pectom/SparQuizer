import {Code, Human, QueryItem} from "../state/AppModel";
import {getCodeFromURL} from "./WikidataApi";

export interface QueryResult {
    [key: string]: {
        type: string
        value: string
    }
}

export function parseHumanInfoResponse(id: string, data: QueryResult, props: Code[]): Human {
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
