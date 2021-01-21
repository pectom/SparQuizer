import React from "react";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import wikidata from "../../assets/wikidata.svg";
import sparql from "../../assets/sparql.png";
import semantic from "../../assets/semantic.png";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: "160px",
        }
    }
))

export const LogoGrid = () => {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" spacing={10} className={classes.container}>
            <Grid item xs={3}>
                <Image src={wikidata} />
            </Grid>
            <Grid item xs={3}>
                <Image src={sparql}/>
            </Grid>
            <Grid item xs={3}>
                <Image src={semantic}/>
            </Grid>
        </Grid>
    )
}
