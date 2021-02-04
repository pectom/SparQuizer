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
}

export type AppActionModel = ActionModel<AppModel>

export const appReducer = (
    state: AppModel = {points: 0, questionCounter: 0},
    action: AppActionModel
): AppModel => {
    const pointsDifference = action.payload ? action.payload.points : 0
    switch (action.type) {
        case AppActionType.NEW_ROUND:
            return {
                ...state,
                points: state.points + pointsDifference,
                questionCounter: state.questionCounter + 1
            };
        case AppActionType.NEW_GAME:
            return {
                ...state,
                points: 0,
                questionCounter: 1
            };
        case AppActionType.CHANGE_POINTS:
            return {
                ...state,
                points: state.points + pointsDifference,
            };
        default:
            return state;
    }
};

