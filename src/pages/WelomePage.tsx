import React from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Card, Typography} from "@material-ui/core";
import {PlayCircleFilled} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Image from "material-ui-image";
import semantic from "../assets/semantic.png"
import wikidata from "../assets/wikidata.svg"
import sparql from "../assets/sparql.png"

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
        card: {
            width: "30%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(5)
        }
    }),
);


export default function WelcomePage() {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Card className={classes.card}>
                <Typography>
                    SparQuizer
                </Typography>
                <Link to="/game">
                    <PlayCircleFilled className={classes.play} fontSize="large"/>
                </Link>
                <Grid container spacing={10}>
                    <Grid item xs={4}>
                        <Image src={wikidata}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Image src={sparql}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Image src={semantic}/>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}
