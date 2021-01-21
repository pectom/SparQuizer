import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {SparQLTypes, SparQLTypography} from "./SparQLTypography";
import {Button, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: "50%",
            height: 100
        }
    }),
);

export default function QuestionCard() {
    const classes = useStyles();

    return (
        <Card >
            <CardContent>
                <SparQLTypography variant="h3" color="textPrimary" type={SparQLTypes.ITEM}>
                    Cristiano Ronaldo
                </SparQLTypography>
                <SparQLTypography variant="h5" color="textPrimary" type={SparQLTypes.PROPERTY}>
                   Oskarżony o
                </SparQLTypography>
                <SparQLTypography variant="h5" color="textPrimary" type={SparQLTypes.PROPERTY}>
                    przestępstwo, za które osoba została skazana
                </SparQLTypography>
                <Grid container >
                    <Grid container>
                        <Button className={classes.button}>Gwałt</Button>
                        <Button className={classes.button}>Oszustwa podatkowe</Button>
                    </Grid>
                    <Grid container>
                        <Button className={classes.button}>Morderstwo</Button>
                        <Button className={classes.button}>Kradzież</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
