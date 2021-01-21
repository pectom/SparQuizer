import React from "react";
import {Link, Typography, TypographyProps} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
        },
        link: {
            fontSize: 12,
            display: "flex",
            alignSelf: "flex-start"
        }
    }),
);

interface SparQLTypographyProps extends TypographyProps{
    code: string
    link: string
}

export const SparQLTypography: React.FC<SparQLTypographyProps> = (props) =>{
    const classes = useStyles()

    const {children, code, link} = props
    return (
            <Typography {...props} className={classes.container}>
                {children}
                <Link href={link} target={"_blank"} className={classes.link}>
                {`  ${code}`}
                </Link>
            </Typography>
    )
}
