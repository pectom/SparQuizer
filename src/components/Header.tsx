import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {EmojiEvents, Timer} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center"
        },
    }),
);
export default function Header() {
    const classes = useStyles();

    return (
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
    );
}
