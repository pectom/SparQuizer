import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import QuestionCard from "./components/QuestionCard";
import HintCard from "./components/HintCard";
import {Typography} from "@material-ui/core";
import {EmojiEvents, Timer} from "@material-ui/icons";

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

export default function App() {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Grid container justify={"space-between"} spacing={3}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Timer/>
                        <Typography>
                            80s
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        SparQuizer
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <EmojiEvents/>
                        <Typography>
                            220 points
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
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
