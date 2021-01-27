import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import {SparQLTypography} from "../common/SparQLTypography";
import AnswersButtons from "./AnswersButtons";
import {Card} from "../common/Card";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {usePropertyInfo} from "../../query/humans";
import {QueryItem} from "../../model/app-model";

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

interface QuestionCardProps{
    propertyId: string
    title: QueryItem
    answer: QueryItem
}

export default function QuestionCard({propertyId, title, answer}: QuestionCardProps) {
    const classes = useStyles()
    const { data: property, isFetching } = usePropertyInfo(`${propertyId}`)

    return (
    <Card className={classes.card}>
        <CardContent className={classes.content} >
            <SparQLTypography variant="h3" color="textPrimary" code={title.code}>
                {title.label}
            </SparQLTypography>
            { !isFetching &&
                <>
                <SparQLTypography variant="h5" color="textPrimary" code={propertyId} sparQLProperty={true}>
                    {property?.results.bindings[0].label.value}
                </SparQLTypography>
                <SparQLTypography variant="h5" color="textPrimary">
                    {property?.results.bindings[0].description.value}
                </SparQLTypography>
                </>
            }
            <AnswersButtons propertyId={propertyId} answer={answer}/>
        </CardContent>
    </Card>

    );
}
