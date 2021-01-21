import React from "react";
import {Card as MaterialCard, CardProps} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(5),
            backgroundColor: theme.palette.background.default
        },
    }),
);

export const Card: React.FC<CardProps> = (props) => {
    const classes = useStyles();
    return (
        <MaterialCard elevation={5} className={clsx(props.className, classes.card)}>
            {props.children}
        </MaterialCard>
    )
}
