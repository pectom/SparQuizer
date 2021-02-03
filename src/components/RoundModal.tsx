/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Button, Divider, Typography} from "@material-ui/core";
import {useModalContext} from "./ModalContexProvider";
import {green, red} from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        },
        paper: {
            backgroundColor: "#FFFFFF",
            border: "0",
            boxShadow: "-3px 4px 20px 4px rgba(0, 0, 0, 0.15)",
            padding: theme.spacing(2),
            maxWidth: "600px",
            maxHeight: "350px",
            minWidth: "424px",
            minHeight: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column"
        },
        footer: {
            paddingTop: 15,
            position: "relative",
        },
        title: {
            align: "center",
            color: red[500],
        },
        button: {
            backgroundColor: "#3a5eaf",
            '&:hover': {
                backgroundColor: "#07369a",
            },
            color: "#fff",
            padding: theme.spacing(2),
            fontSize: 16
        },
        points: {
            color: red[500],
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20
        },
        pointLabel: {
            marginLeft: 5,
            fontWeight: "bold",
            fontSize: 20
        },
        body: {
            fontSize: 20
        },
        success: {
            color: green[400]
        },
        answer: {
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20
        }
    })
);

interface ModalModeProps{
    title: string,
    body: string,
    success: boolean,
}
export type ModalModeKeys = "timeout" | "wrong" | "good"

const modalMode: {[key: string]: ModalModeProps} = {
    "timeout": {
        title: "Timeout :(",
        body: "Time is up",
        success: false
    },
    "wrong": {
        title: "Wrong :(",
        body: "Your answer is invalid",
        success: false
    },
    "good": {
        title: "Great!",
        body: "Your answer is correct",
        success: true
    }
}

export default function RoundModal(): JSX.Element {
    const classes = useStyles();
    const {open, setOpen, mode, answer, points} = useModalContext();
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleClose = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        setTitle(modalMode[mode].title)
        setBody(modalMode[mode].body)
        setSuccess(modalMode[mode].success)
    }, [mode])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h2" className={clsx(classes.title, {
                        [classes.success]: success,
                    })}>
                        {title}
                    </Typography>
                    <Divider/>
                    <Typography className={classes.body}>
                        {body}
                        <Typography className={clsx(classes.points, {
                            [classes.success]: success,
                        })}>
                            {points > 0? `+${points}`: points}
                            <Typography className={classes.pointLabel}>
                                points
                            </Typography>
                        </Typography>
                    </Typography>
                    {
                        !success &&
                        <Typography >
                            {`The correct answer is`}
                            <Typography className={classes.answer}>
                                {answer}
                            </Typography>
                        </Typography>
                    }
                    <div className={classes.footer}>
                        <Button onClick={() => setOpen(false)} size="medium" className={classes.button}>
                            Next question
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}
