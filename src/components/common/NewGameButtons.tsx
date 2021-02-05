import React from "react";
import {IconButton, SvgIconProps} from "@material-ui/core";
import {Link} from "react-router-dom";
import {PlayCircleFilled} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {GameActionCreator} from "../../state/GameActionCreator";

interface NewGameButtonProps {
    iconProps: SvgIconProps
}

export const NewGameButton: React.FC<NewGameButtonProps> = ({iconProps}: NewGameButtonProps) => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(GameActionCreator.newGame())
    }

    return (
        <Link to="/game">
            <IconButton onClick={onClick}>
                <PlayCircleFilled {...iconProps} />
            </IconButton>
        </Link>
    )
}
