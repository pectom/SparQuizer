import React from "react";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import wikidata from "../../assets/wikidata.svg";
import sparql from "../../assets/sparql.png";
import semantic from "../../assets/semantic.png";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link} from "@material-ui/core";

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
                <Link href={`https://www.wikidata.org`} target={"_blank"}>
                    <Image src={wikidata} />
                </Link>
            </Grid>
            <Grid item xs={3}>
                <Link href={`https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/queries/examples#Gender_balance_of_members_of_Irish_parliament`} target={"_blank"}>
                    <Image src={sparql}/>
                </Link>
            </Grid>
            <Grid item xs={3}>
                <Link href={`https://www.w3.org/standards/semanticweb/`} target={"_blank"}>
                    <Image src={semantic}/>
                </Link>
            </Grid>
        </Grid>
    )
}
