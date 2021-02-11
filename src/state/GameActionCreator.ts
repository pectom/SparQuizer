import {ActionModel, AppActionType} from "./AppReducer";
import {ThunkDispatch} from "redux-thunk";
import {
    selectQuestionProp, Wikidata,
} from "../wikidata/WikidataApi";
import {AppModel, Code} from "./AppModel";
import _ from "lodash";
import {BaseHumanProps} from "../wikidata/PropConfig";

export type ThunkFunction<T> = (
    dispatch: ThunkDispatch<AppModel, void, ActionModel<T>>,
    getState: () => AppModel
) => Promise<unknown> | unknown;

function removeInvalidProps(allProps: Code[], removedProps: Code[], questionProp: Code): Code[] {
    let filteredProps: Code[] = [];
    allProps.forEach(prop => {
        if (!removedProps.includes(prop) && prop !== questionProp){
            filteredProps.push(prop)
        }
    })
    return _.shuffle(filteredProps)
}

export class GameActionCreator {
    static newGame(): ThunkFunction<Pick<AppModel, "humans">> {
        return async (dispatch): Promise<void> => {
            const humans = await Wikidata.getHumans()
            dispatch({
                type: AppActionType.FETCHING_DATA,
                isFetchingData: true
            })

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

    static newRound(points: number): ThunkFunction<Pick<AppModel, "isFetchingData">> {
        return async (dispatch, getState): Promise<void> => {
            dispatch({
                    type: AppActionType.FETCHING_DATA,
                    payload: {
                        isFetchingData: true
                    }
                }
            )

            const {humans} = getState()
            const human = _.sample(humans) || ""
            const allProps = _.shuffle(await Wikidata.getAndFilterHumanPropsById(human))

            const questionProp = selectQuestionProp(allProps)
            const selectedProps = removeInvalidProps(allProps, BaseHumanProps, questionProp).slice(0, 10)

            const props = new Set([
                ...BaseHumanProps,
                questionProp,
                ...selectedProps,
            ])
            const currentHuman = await Wikidata.getHumanById(human, Array.from(props))

            const correctAnswer = {
                ...currentHuman[questionProp].values[0],
                isValidAnswer: true
            }

            const question = await Wikidata.getPropertyInfo(questionProp)
            const answers = await Wikidata.getPropertyAnswers(questionProp)
            const answersSet = answers.filter(answer => {
                return answer.label !==  correctAnswer.label
            })

            const finalAnswer = answersSet.slice(0, 3)
            finalAnswer.push(correctAnswer)


            dispatch({
                    type: AppActionType.NEW_ROUND,
                    payload: {
                        points,
                        currentHuman,
                        question,
                        answers: _.shuffle(finalAnswer),
                        isFetchingData: false
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
