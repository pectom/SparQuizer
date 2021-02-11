import {Button} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {SparQLTypography} from "../common/SparQLTypography";
import {useModalContext} from "../ModalContexProvider";
import {useSelector} from "react-redux";
import {AppModel} from "../../state/AppModel";

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

export interface Answer {
    label: string,
    code: string,
    isValidAnswer: boolean
}

export default function AnswersButtons() {
    const classes = useStyles();
    const {setOpen, setMode} = useModalContext()
    const { answers } = useSelector((state: AppModel) => state)

    const onClick = (isValidAnswer: boolean) => {
        setOpen(true)
        if (isValidAnswer) {
            setMode("good")
        } else {
            setMode("wrong")
        }
    }
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
