import React from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Logo} from "../components/common/Logo";
import {LogoGrid} from "../components/common/LogoGrid";
import {Card} from "../components/common/Card";
import {NewGameButton} from "../components/common/NewGameButtons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100vh",
            padding: theme.spacing(10)
        },
        play: {
            color: "red",
            fontSize: "120px"
        },
        card: {
            width: "30%",
            height: "50vh",
        },
        playContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    }),
);


export default function WelcomePage() {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Card className={classes.card}>
                <Logo/>
                <div className={classes.playContainer}>
                    <NewGameButton iconProps={{className: classes.play, fontSize: "inherit"}}/>
                    <Typography variant="h5">
                        Let's play!
                    </Typography>
                </div>
                <LogoGrid/>
            </Card>
        </Grid>
    );
}
