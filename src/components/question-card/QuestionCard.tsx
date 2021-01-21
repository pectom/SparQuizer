import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import {SparQLTypography} from "../common/SparQLTypography";
import AnswersButtons from "./AnswersButtons";
import {Card} from "../common/Card";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2)
        },
        content: {
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            height: "500px"
        },
    }),
);

export default function QuestionCard() {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardContent className={classes.content} >
                <SparQLTypography variant="h3" color="textPrimary" code={"Q12312"} link="https://www.wikidata.org/wiki/Q11571">
                    Cristiano Ronaldo
                </SparQLTypography>
                <SparQLTypography variant="h5" color="textPrimary" code={"Q12312"} link="https://www.wikidata.org/wiki/Q11571">
                   Oskarżony o
                </SparQLTypography>
                <SparQLTypography variant="h5" color="textPrimary" code={"Q12312"} link="https://www.wikidata.org/wiki/Q11571">
                    przestępstwo, za które osoba została skazana
                </SparQLTypography>
                <AnswersButtons/>
            </CardContent>
        </Card>
    );
}
