import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {EmojiEvents, Timer} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Logo} from "./common/Logo";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container:{
            marginBottom: theme.spacing(1)
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.default
        },
        icon: {
          marginRight: theme.spacing(2),
            fontSize: 30
        },
        trophy: {
            color: "gold"
        }
    }),
);
export default function Header() {
    const classes = useStyles();

    return (
        <Grid container justify={"space-between"} spacing={2} className={classes.container}>
            <Grid item xs={2} >
                <Paper elevation={3} className={classes.paper}>
                    <Timer className={classes.icon}/>
                    <Typography>
                        80s
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={5} >
                <Logo elevation={3}/>
            </Grid>
            <Grid item xs={2} >
                <Paper elevation={3} className={classes.paper} >
                    <EmojiEvents className={clsx(classes.trophy, classes.icon)}/>
                    <Typography>
                        220 points
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
