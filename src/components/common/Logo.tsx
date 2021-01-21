import React from "react";
import {Paper, PaperProps, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            padding: theme.spacing(2),
            borderWidth: theme.spacing(0.25),
            borderColor: theme.palette.grey.A700,
            backgroundColor: "#3a5eaf",
            justifyContent: "center",
            display: "flex",
        },
        spraquizer: {
            color: "white"
        }
    }),
);
export const Logo: React.FC<PaperProps> = (props) => {
    const classes = useStyles();
    return (
        <Paper variant="outlined"  className={classes.logo} {...props}>
            <Typography variant="h3" className={classes.spraquizer}>
                SparQuizer
            </Typography>
        </Paper>
    )
}
