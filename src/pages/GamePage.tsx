import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";
import QuestionCard from "../components/question-card/QuestionCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppModel} from "../state/AppModel";
import RoundModal from "../components/RoundModal";
import {ModalContextProvider} from "../components/ModalContexProvider";
import {useSelector} from "react-redux";
import {useConfigContext} from "../state/ConfigContext";
import {useHistory} from "react-router-dom";
import HintCard from "../components/hint-card/HintCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100vh",
            padding: theme.spacing(10)
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center"
        },
    }),
);

export default function GamePage() {
    const classes = useStyles();

    const {questionCounter, currentHuman} = useSelector((state: AppModel) => state)
    const {questionNumber} = useConfigContext()
    const history = useHistory()

    useEffect(() => {
        if (questionCounter > questionNumber) {
            history.push("finish")
        }
    }, [history, questionCounter, questionNumber])

    return (
        <ModalContextProvider>
            <Grid container alignItems="center" justify="center" spacing={1} className={classes.root}>
                <Header/>
                {
                    currentHuman &&
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <QuestionCard/>
                        </Grid>
                        <Grid item xs={4}>
                            <HintCard/>
                        </Grid>
                    </Grid>
                }
                <RoundModal/>
            </Grid>
        </ModalContextProvider>
    );
}
