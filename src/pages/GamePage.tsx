import React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";
import QuestionCard from "../components/question-card/QuestionCard";
import HintCard from "../components/hint-card/HintCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

    return (
        <Grid container alignItems="center" justify="center" spacing={1} className={classes.root}>
            <Header/>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <QuestionCard/>
                </Grid>
                <Grid item xs={4}>
                    <HintCard/>
                </Grid>
            </Grid>
        </Grid>
    );
}
