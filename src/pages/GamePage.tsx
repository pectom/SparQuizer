import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";
import QuestionCard from "../components/question-card/QuestionCard";
import HintCard from "../components/hint-card/HintCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {parseResponse, useHumanById} from "../query/humans";
import {Human} from "../state/AppModel";

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
    const [human, setHuman] = useState<Human | undefined>(undefined)
    const id = "Q11571"
    const classes = useStyles();

    const {data, isFetching} = useHumanById(id)

    useEffect(() => {
        if (data){
            setHuman(parseResponse(id, data.results.bindings[0]))
        }
    }, [data])

    return (
        <Grid container alignItems="center" justify="center" spacing={1} className={classes.root}>
            <Header/>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    {
                        !isFetching && human &&
                        <QuestionCard propertyId={"P1399"}
                                      title={human.name.values[0]}
                                      answer={human.convicted.values[0]}/>
                    }
                </Grid>
                <Grid item xs={4}>
                    <HintCard human={human}/>
                </Grid>
            </Grid>
        </Grid>
    );
}
