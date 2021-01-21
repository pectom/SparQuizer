import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {SparQLTypography} from "../common/SparQLTypography";
import AnswersButtons from "./AnswersButtons";


export default function QuestionCard() {
    return (
        <Card >
            <CardContent>
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
