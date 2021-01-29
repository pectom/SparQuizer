export interface QueryItem {
    code?: string,
    label: string,
}

export interface PropertyItem {
    property: QueryItem,
    values: QueryItem[]
}

type HumanId = string
type Time = number
type Point = number

interface Human extends QueryItem{
    image: string,
    properties: PropertyItem[]
}

export interface Question{
    human: Human,
    property: QueryItem,
    description: string,
}

export interface AppModel{
    humanList: HumanId[]
    points: Point
    question: Question
    questionNumber: number
}
