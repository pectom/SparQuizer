import {ActionModel, AppActionType} from "./AppReducer";
import {ThunkDispatch} from "redux-thunk";
import {
     Wikidata,
} from "../wikidata/WikidataApi";
import {AppModel, Code} from "./AppModel";
import _ from "lodash";
import {QuestionPreferredProps, RequiredHumanProps} from "../wikidata/PropConfig";
import {Answer} from "../components/question-card/AnswersButtons";

export type ThunkFunction<T> = (
    dispatch: ThunkDispatch<AppModel, void, ActionModel<T>>,
    getState: () => AppModel
) => Promise<unknown> | unknown;

function removeInvalidProps(allProps: Code[], questionProp: Code): Code[] {
    let filteredProps: Code[] = [];
    allProps.forEach(prop => {
        if (!RequiredHumanProps.includes(prop) && prop !== questionProp){
            filteredProps.push(prop)
        }
    })
    return _.shuffle(filteredProps)
}

export function selectQuestionProp(allProps: Code[]): Code {
    const props = _.shuffle(allProps)
    for (let i = 0; i < props.length; i++) {
        if (QuestionPreferredProps.includes(props[i])) {
            return props[i]
        }
    }
    for (let i = 0; i < props.length; i++) {
        if (!RequiredHumanProps.includes(props[i])) {
            return props[i]
        }
    }
    return props[0]
}
async function createAnswerSet(questionProp: Code, correctAnswer: Answer){
    const answers = await Wikidata.getPropertyAnswers(questionProp)
    const answersSet = answers.filter(answer => {
        return answer.label !==  correctAnswer.label
    })

    const finalAnswer = answersSet.slice(0, 3)
    finalAnswer.push(correctAnswer)
    return _.shuffle(finalAnswer)
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
            const allHumanPropsIds = _.shuffle(await Wikidata.getAndFilterHumanPropsById(human))

            const questionProp = selectQuestionProp(allHumanPropsIds)
            const selectedProps = removeInvalidProps(allHumanPropsIds, questionProp).slice(0, 10)
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
            const answers = await createAnswerSet(questionProp, correctAnswer)

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
