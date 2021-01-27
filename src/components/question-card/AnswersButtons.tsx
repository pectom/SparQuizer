import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {SparQLTypography} from "../common/SparQLTypography";
import {QueryItem} from "../../model/app-model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: "50%",
            height: 100
        }
    }),
);

interface AnswersButtonsProps{
    propertyId: string
    answer: QueryItem
}

export default function AnswersButtons({propertyId, answer}:AnswersButtonsProps) {
    const classes = useStyles();

    return (
        <Grid container >
            <Grid container>
                <Button className={classes.button}>
                    <SparQLTypography code={answer.code} >
                        {answer.label}
                    </SparQLTypography>
                </Button>
                <Button className={classes.button}>
                    <SparQLTypography code="Q12312" >
                        Oszustwa podatkowe
                    </SparQLTypography>
                </Button>
            </Grid>
            <Grid container>
                <Button className={classes.button}>
                    <SparQLTypography code="Q12312" >
                        Kradzież
                    </SparQLTypography>
                </Button>
                <Button className={classes.button}>
                    <SparQLTypography code="Q12312" >
                        Morderstwo
                    </SparQLTypography>
                </Button>
            </Grid>
        </Grid>
    );
}
