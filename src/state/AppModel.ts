export interface QueryItem {
    code?: string,
    label: string,
}

export interface PropertyItem {
    property: QueryItem,
    values: QueryItem[]
}

export type Point = number
export type Counter = number
export type Code = string

export interface Human {
    [key: string]: PropertyItem
}

export interface Question{
    code: Code,
    label: string,
    description: string,
}

export interface AppModel{
    humans: Code[],
    points: Point,
    questionCounter: Counter,
    question: Question,
    currentHuman?: Human,
}
