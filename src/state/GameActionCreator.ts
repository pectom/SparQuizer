import {ActionModel, AppActionType} from "./AppReducer";
import {ThunkDispatch} from "redux-thunk";
import {
    BaseHumanProps,
    getAllHumanPropsById,
    getFunctionProp,
    getHumanById,
    getHumans, getPropertyAnswers,
    getPropertyInfo
} from "../query/humans";
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
            const allProps = _.shuffle(await getAllHumanPropsById(human))

            const [questionProp, index] = getFunctionProp(allProps)

            allProps.splice(index)
            const selectedProps = allProps.slice(1, 10)

            const props = new Set([
                ...BaseHumanProps,
                questionProp,
                ...selectedProps,
            ])
            const currentHuman = await getHumanById(human, Array.from(props))

            const correctAnswer = {
                ...currentHuman[questionProp].values[0],
                isValidAnswer: true
            }
            const question = await getPropertyInfo(questionProp)
            const answers = await getPropertyAnswers(questionProp)
            const answersSet = answers.filter(answer => {
                return answer.label !==  correctAnswer.label
            })

            const finalAnswer = answersSet.slice(0, 3)
            finalAnswer.push(correctAnswer)

            debugger
            dispatch({
                    type: AppActionType.NEW_ROUND,
                    payload: {
                        points,
                        currentHuman,
                        question,
                        answers: _.shuffle(finalAnswer)
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
