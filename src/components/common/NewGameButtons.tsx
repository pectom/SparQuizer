import React from "react";
import {IconButton, SvgIconProps} from "@material-ui/core";
import {Link} from "react-router-dom";
import {PlayCircleFilled} from "@material-ui/icons";

interface NewGameButtonProps {
    iconProps: SvgIconProps
}

export const NewGameButton: React.FC<NewGameButtonProps> = ({iconProps}: NewGameButtonProps) => {
    return (
        <Link to="/game">
            <IconButton >
                <PlayCircleFilled {...iconProps} />
            </IconButton>
        </Link>
    )
}
