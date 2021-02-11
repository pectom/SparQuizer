import {ActionModel, AppActionType} from "./AppReducer";
import {ThunkDispatch} from "redux-thunk";
import {Wikidata,} from "../wikidata/WikidataApi";
import {AppModel} from "./AppModel";
import _ from "lodash";
import {RequiredHumanProps} from "../wikidata/PropConfig";
import {Answer} from "../components/question-card/AnswersButtons";
import {Utils} from "../wikidata/Utils";

export type ThunkFunction<T> = (
    dispatch: ThunkDispatch<AppModel, void, ActionModel<T>>,
    getState: () => AppModel
) => Promise<unknown> | unknown;


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
            const allHumanPropsIds = _.shuffle(await Wikidata.getAndFilterHumanPropsById(human))

            const questionProp = Utils.selectQuestionProp(allHumanPropsIds)
            const selectedProps = Utils.removeInvalidProps(allHumanPropsIds, questionProp).slice(0, 10)
            const props = new Set([
                ...RequiredHumanProps,
                questionProp,
                ...selectedProps,
            ])
            const currentHuman = await Wikidata.getSelectedHumanInfo(human, Array.from(props))

            const question = await Wikidata.getPropertyInfo(questionProp)

            const correctAnswer: Answer = {
                code: questionProp,
                label: currentHuman[questionProp].values[0].label,
                isValidAnswer: true
            }
            const answers = await Utils.createAnswerSet(questionProp, correctAnswer)

            dispatch({
                    type: AppActionType.NEW_ROUND,
                    payload: {
                        points,
                        currentHuman,
                        question,
                        answers: _.shuffle(answers),
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
