import {Code} from "../state/AppModel";
import {QuestionPreferredProps, RequiredHumanProps} from "./PropConfig";
import _ from "lodash";
import {Answer} from "../components/question-card/AnswersButtons";
import {Wikidata} from "./WikidataApi";


export class Utils {
    static removeInvalidProps(allProps: Code[], questionProp: Code): Code[] {
        let filteredProps: Code[] = [];
        allProps.forEach(prop => {
            if (!RequiredHumanProps.includes(prop) && prop !== questionProp){
                filteredProps.push(prop)
            }
        })
        return _.shuffle(filteredProps)
    }

    static selectQuestionProp(allProps: Code[]): Code {
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
    static async createAnswerSet(questionProp: Code, correctAnswer: Answer){
        const answers = await Wikidata.getPropertyAnswers(questionProp)
        const answersSet = answers.filter(answer => {
            return answer.label !==  correctAnswer.label
        })

        const finalAnswer = answersSet.slice(0, 3)
        finalAnswer.push(correctAnswer)
        return _.shuffle(finalAnswer)
    }

    static getCodeFromURL(url: string) {
        return url.split("/").slice(-1).pop()
    }

}
