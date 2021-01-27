import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {Casino} from '@material-ui/icons/';
import Image from 'material-ui-image';
import {Button, Grid} from "@material-ui/core";
import PropertyList from "./PropertyList";
import {Card} from "../common/Card";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2)
        },
        content: {
            width: "100%",
            flexDirection: "column",
            display: "flex",
            alignContent: "center",
            minHeight: "500px"
        },
        diceIcon: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        diceIconClicked: {
            transform: 'rotate(180deg)',
        },
        image: {
            width: 100
        },
        name: {
            alignSelf: "center",
            marginBottom: theme.spacing(2)
        },
        hidden: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            minHeight: "500px"
        },
        hintText: {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
        }
    }),
);

export default function HintCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCardClick = () => {
        setHidden(true);
    };
    return (
        <Card className={classes.card}>
            { hidden ?
                <>
                    <CardContent className={classes.content}>
                        <Typography variant="h4" color="textPrimary" className={classes.name}>
                            Cristiano
                            Ronaldo
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <PropertyList/>
                            </Grid>
                            <Grid item xs={6}>
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
                                    disableSpinner
                                    className={classes.image}
                                    animationDuration={100}
                                >
                                </Image>
                            </Grid>
                        </Grid>
                        {expanded &&
                        <PropertyList/>
                        }
                    </CardContent>
                    {!expanded &&
                    <CardActions disableSpacing>
                        <Button
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <Casino className={clsx(classes.diceIcon, {
                                [classes.diceIconClicked]: expanded,
                            })}/>
                            Draw new properties (-5 points)
                        </Button>
                    </CardActions>
                    }
                </>
            :
                <CardContent className={clsx(classes.content, classes.hidden)} onClick={handleCardClick}>
                    <Typography variant="h4" className={classes.hintText}>
                        Take a hint (-10p)
                    </Typography>
            </CardContent>
            }
        </Card>
    );
}
