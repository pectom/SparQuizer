import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            padding: theme.spacing(2),
            borderWidth: theme.spacing(0.25),
            borderColor: theme.palette.grey.A700,
            backgroundColor: theme.palette.background.default
        }
    }),
);
export const Logo = () => {
    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.logo}>
            <Typography variant="h3">
                SparQuizer
            </Typography>
        </Paper>
    )
}
