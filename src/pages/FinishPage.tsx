import React from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Card, Paper} from "@material-ui/core";
import {PlayCircleFilled} from "@material-ui/icons";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100vh",
            padding: theme.spacing(10)
        },
        play: {
            color: "red"
        },
    }),
);


export default function FinishPage() {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Card>
                <Paper>
                    SparQuizer
                </Paper>
                <Link to="/game">
                    <PlayCircleFilled className={classes.play}/>
                </Link>
            </Card>

        </Grid>
    );
}
