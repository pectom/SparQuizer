import React from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, IconButton, Typography} from "@material-ui/core";
import {EmojiEventsRounded, PlayCircleFilled} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {Logo} from "../components/common/Logo";
import {LogoGrid} from "../components/common/LogoGrid";
import {Card} from "../components/common/Card";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100vh",
            padding: theme.spacing(10)
        },
        play: {
            color: "red",
            fontSize: "40px"
        },
        card: {
            width: "30%",
            height: "50vh",
        },
        congrats: {
            width: "100px",
            height: "100px",
            color: "gold"
        },
        playAgain: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }),
);


export default function FinishPage() {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Card className={classes.card}>
                <Logo/>
                <Typography variant="h6">
                    Congratulations!
                </Typography>
                <EmojiEventsRounded className={classes.congrats}/>
                <Typography>
                    Your score: 10 points
                </Typography>
                <Box className={classes.playAgain} >
                    <Typography>
                        Play again?
                    </Typography>
                    <Link to="/game">
                        <IconButton>
                            <PlayCircleFilled className={classes.play} fontSize="inherit"/>
                        </IconButton>
                    </Link>
                </Box>

                <LogoGrid/>
            </Card>
        </Grid>
    );
}
