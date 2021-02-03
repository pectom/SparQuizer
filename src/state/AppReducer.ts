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
}

export type AppActionModel = ActionModel<AppModel>

export const appReducer = (
    state: AppModel = {points: 0, questionCounter: 0},
    action: AppActionModel
): AppModel => {
    switch (action.type) {
        case AppActionType.NEW_ROUND:
            const pointsDifference = action.payload ? action.payload.points : 0
            return {
                points: state.questionCounter + pointsDifference,
                questionCounter: state.questionCounter++
            };
        case AppActionType.NEW_GAME:
            return {
                points: 0,
                questionCounter: 1
            };
        default:
            return state;
    }
};

