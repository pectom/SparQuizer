import {AppActionModel, AppActionType} from "./AppReducer";

export class GameActionCreator{
    static newGame(): AppActionModel{
        return {
            type: AppActionType.NEW_GAME
        }
    }

    static goodAnswer(){
        return {
            type: AppActionType.NEW_ROUND,
            payload: {
                points: 10
            }
        }
    }

    static wrongAnswer(){
        return {
            type: AppActionType.NEW_ROUND,
            payload: {
                points: -10
            }
        }
    }

}
