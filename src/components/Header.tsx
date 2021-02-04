import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {EmojiEvents, Timer} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Logo} from "./common/Logo";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {AppModel} from "../state/AppModel";
import {useConfigContext} from "../state/ConfigContext";
import {useModalContext} from "./ModalContexProvider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container:{
            marginBottom: theme.spacing(1)
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.default
        },
        icon: {
          marginRight: theme.spacing(2),
            fontSize: 30
        },
        trophy: {
            color: "gold"
        }
    }),
);
export default function Header() {
    const classes = useStyles();
    const {points, questionCounter} = useSelector((state: AppModel) => state)
    const {roundTime} = useConfigContext()
    const [startTime, setStartTime] = useState<number>(Date.now)
    const {setMode, setOpen} = useModalContext()

    const calculateTimeLeft = () :number => {
        const time = Math.round((roundTime - (Date.now() - startTime)) / 1000)
        return time < 0 ? 0 : time
    };

    const [timeLeft, setTimeLeft] = useState<number>(roundTime/1000);

    useEffect(() => {
        setStartTime(Date.now())
    }, [questionCounter])

    useEffect(() => {
        const timer=setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });


    useEffect(() => {
        if(timeLeft <= 0){
            setOpen(true)
            setMode("timeout")
        }
    }, [setMode, setOpen, timeLeft]);

    return (
        <Grid container justify={"space-between"} spacing={2} className={classes.container}>
            <Grid item xs={2} >
                <Paper elevation={3} className={classes.paper}>
                    <Timer className={classes.icon}/>
                    <Typography>
                        {timeLeft} s
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={5} >
                <Logo elevation={3}/>
            </Grid>
            <Grid item xs={2} >
                <Paper elevation={3} className={classes.paper} >
                    <EmojiEvents className={clsx(classes.trophy, classes.icon)}/>
                    <Typography>
                        {points} points
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
