import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {Casino} from '@material-ui/icons/';
import Image from 'material-ui-image';
import {Button, Grid} from "@material-ui/core";
import PropertyList from "./PropertyList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);


export default function HintCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" color="textPrimary">
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
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Casino className={clsx(classes.diceIcon, {
                        [classes.diceIconClicked]: expanded,
                    })}/>
                    Draw new properties
                </Button>
            </CardActions>
            <PropertyList/>
        </Card>
    );
}
