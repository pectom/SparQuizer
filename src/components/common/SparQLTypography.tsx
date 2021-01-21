import React from "react";
import {Link, Typography, TypographyProps} from "@material-ui/core";

interface SparQLTypographyProps extends TypographyProps{
    code: string
    link: string
}

export const SparQLTypography: React.FC<SparQLTypographyProps> = (props) =>{
    const {children, code, link} = props
    return (
        <>
            <Typography {...props}>
                {children}

            </Typography>
            <Link href={link}>
                {code}
            </Link>
        </>
    )
}
