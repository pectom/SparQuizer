import {AppModel} from "./AppModel";

export type CombinedReducers<StateModel> = {
    [key in keyof StateModel]: <T, U>(state: T, action: ActionModel<U>) => T;
};

export interface ActionModel<T> {
    type: string;
    payload?: T;
}

export enum AppActionType {
    NEW_ROUND = "NEW_ROUND",
    NEW_GAME = "NEW_GAME",
    CHANGE_POINTS = "CHANGE_POINTS",
    FETCHING_DATA = "FETCHING_DATA"
}

export type AppActionModel = ActionModel<AppModel>

export const appReducer = (
    state: AppModel = {
        isFetchingData: true,
        answers: [],
        humans: [], points: 0, questionCounter: 0, currentHuman: undefined, question: {code: "", label: "", description: ""}},
    action: AppActionModel
): AppModel => {
    const pointsDifference = action.payload ? action.payload.points : 0
    switch (action.type) {
        case AppActionType.NEW_GAME:
            const humans = action.payload ? action.payload.humans : []
            return {
                ...state,
                humans,
                points: 0,
                questionCounter: 0
            };
        case AppActionType.NEW_ROUND:
            const currentHuman = action.payload ? action.payload.currentHuman : undefined;
            const question = action.payload ? action.payload.question : {code: "", label: "", description: ""};
            const answers = action.payload ? action.payload.answers : [];
            const isFetchingData = action.payload ? action.payload.isFetchingData : false;
            return {
                ...state,
                currentHuman,
                points: state.points + pointsDifference,
                questionCounter: state.questionCounter + 1,
                question,
                answers,
                isFetchingData
            };
        case AppActionType.CHANGE_POINTS:
            return {
                ...state,
                points: state.points + pointsDifference,
            };
        case AppActionType.FETCHING_DATA:
            return {
                ...state,
                isFetchingData: action.payload ? action.payload.isFetchingData : true,
            };
        default:
            return state;
    }
};
