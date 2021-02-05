import {ActionModel, AppActionType} from "./AppReducer";
import {ThunkDispatch} from "redux-thunk";
import {getAllHumanPropsById, getHumanById, getHumans} from "../query/humans";
import {AppModel} from "./AppModel";
import _ from "lodash";

export type ThunkFunction<T> = (
    dispatch: ThunkDispatch<AppModel, void, ActionModel<T>>,
    getState: () => AppModel
) => Promise<unknown> | unknown;

export class GameActionCreator {
    static newGame(): ThunkFunction<Pick<AppModel, "humans">> {
        return async (dispatch): Promise<void> => {
            const humans = await getHumans()
            dispatch({
                    type: AppActionType.NEW_GAME,
                    payload: {
                        points: 0,
                        humans: humans,
                        questionCounter: 0,
                    }
                }
            )
            dispatch(this.newRound(0))
        }
    }

    static newRound(points: number): ThunkFunction<Pick<AppModel, "points" | "currentHuman">> {
        return async (dispatch, getState): Promise<void> => {
            const {humans} = getState()
            const human = _.sample(humans) || ""
            const allProps = await getAllHumanPropsById(human)
            const currentHuman = await getHumanById(human)
            dispatch({
                    type: AppActionType.NEW_ROUND,
                    payload: {
                        points,
                        currentHuman
                    }
                }
            )
        }
    }

    static changePoint(points: number) {
        return {
            type: AppActionType.CHANGE_POINTS,
            payload: {
                points
            }
        }
    }
}
