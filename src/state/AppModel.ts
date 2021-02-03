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

export interface Human {
    [key: string]: PropertyItem
}

export interface Question{
    human: Human,
    property: QueryItem,
    description: string,
}

export interface AppModel{
    points: Point
    questionCounter: Counter
}
