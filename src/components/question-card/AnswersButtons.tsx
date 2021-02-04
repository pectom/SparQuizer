import {Button} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {SparQLTypography} from "../common/SparQLTypography";
import {useModalContext} from "../ModalContexProvider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 250,
            width: "100%"
        },
        button: {
            width: "50%",
            height: 100
        }
    }),
);

interface Answer {
    label: string,
    code: string,
    isValidAnswer: boolean
}

export default function AnswersButtons() {
    const classes = useStyles();
    const {setOpen, setMode, setAnswer} = useModalContext()

    const onClick = (isValidAnswer: boolean) => {
        setOpen(true)
        if (isValidAnswer) {
            setMode("good")
        } else {
            setMode("wrong")
        }
        setAnswer("good")
    }

    const answers: Answer[] = [
        {
            label: "Tax",
            code: "Q12312",
            isValidAnswer: true
        },
        {
            label: "Gawłt",
            code: "Q12312",
            isValidAnswer: false
        },
        {
            label: "Kradzież",
            code: "Q12312",
            isValidAnswer: false
        },
        {
            label: "Morderstwo",
            code: "Q12312",
            isValidAnswer: false
        },
    ]

    return (
        <div className={classes.container}>
            {
                answers.map(answer => {
                    return (
                        <Button className={classes.button} onClick={() => onClick(answer.isValidAnswer)} key={`${answer.label}_${answer.code}`}>
                            <SparQLTypography code={answer.code}>
                                {answer.label}
                            </SparQLTypography>
                        </Button>
                    )
                })
            }
            <></>
        </div>
    );
}
