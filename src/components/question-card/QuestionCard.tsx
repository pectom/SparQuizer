import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import {SparQLTypography} from "../common/SparQLTypography";
import AnswersButtons from "./AnswersButtons";
import {Card} from "../common/Card";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppModel} from "../../state/AppModel";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useConfigContext} from "../../state/ConfigContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2)
        },
        content: {
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            height: "100%"
        },
        cardContent: {
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            height: "500px"
        },
        questionNumber: {
            alignSelf: "flex-end",
        }
    }),
);



export default function QuestionCard() {
    const classes = useStyles()
    const {questionCounter, currentHuman, question} = useSelector((state: AppModel) => state)
    const {questionNumber} = useConfigContext()

    return (
    <Card className={classes.card}>
        {
            currentHuman &&
        <CardContent className={classes.cardContent} >
            <Typography className={classes.questionNumber} variant="h6">
                Question: {questionCounter} / {questionNumber}
            </Typography>
            <div className={classes.content}>
                <SparQLTypography variant="h3" color="textPrimary" code={currentHuman.name.values[0].code}>
                    {currentHuman.name.values[0].label}
                </SparQLTypography>
                { question &&
                <>
                    <SparQLTypography variant="h5" color="textPrimary" code={question.code} sparQLProperty={true}>
                        {question.label}
                    </SparQLTypography>
                    <SparQLTypography variant="h5" color="textPrimary">
                        {question.description}
                    </SparQLTypography>
                </>
                }
                <AnswersButtons/>
            </div>
        </CardContent>
        }
    </Card>

    );
}
