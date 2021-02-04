import {AppActionModel, AppActionType} from "./AppReducer";

export class GameActionCreator{
    static newGame(): AppActionModel{
        return {
            type: AppActionType.NEW_GAME
        }
    }

    static newRound(points: number){
        return {
            type: AppActionType.NEW_ROUND,
            payload: {
                points
            }
        }
    }

    static changePoint(points: number){
        return {
            type: AppActionType.CHANGE_POINTS,
            payload: {
                points
            }
        }
    }
}
