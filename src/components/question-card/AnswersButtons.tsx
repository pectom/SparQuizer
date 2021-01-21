import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {SparQLTypography} from "../common/SparQLTypography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: "50%",
            height: 100
        }
    }),
);
export default function AnswersButtons() {
    const classes = useStyles();

    return (
        <Grid container >
            <Grid container>
                <Button className={classes.button}>
                    <SparQLTypography code="Q12312" link="https://www.wikidata.org/wiki/Q11571">
                        Gwałt
                    </SparQLTypography>
                </Button>
                <Button className={classes.button}>Oszustwa podatkowe</Button>
            </Grid>
            <Grid container>
                <Button className={classes.button}>Morderstwo</Button>
                <Button className={classes.button}>Kradzież</Button>
            </Grid>
        </Grid>
    );
}
