import React from "react";
import {Typography, TypographyProps} from "@material-ui/core";

export enum SparQLTypes{
    ITEM="Q",
    PROPERTY="P",
    VALUE="Q",
}

interface SparQLTypographyProps extends TypographyProps{
    type: SparQLTypes
}

export const SparQLTypography: React.FC<SparQLTypographyProps> = (props) =>{
    const {children, type} = props
    return (
        <Typography {...props}>
            {children} {type}
        </Typography>
    )
}
