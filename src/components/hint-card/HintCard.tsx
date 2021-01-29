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
import {Human} from "../../query/humans";
import {SparQLTypography} from "../common/SparQLTypography";
import {PropertyItem} from "../../model/app-model";

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

interface HintCardProps {
    human?: Human
}

export default function HintCard({human}: HintCardProps) {
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
            {hidden && human ?
                <>
                    <CardContent className={classes.content}>
                        <SparQLTypography variant="h4" color="textPrimary" className={classes.name} code={human.name.values[0].code}>
                            {human.name.values[0].label}
                        </SparQLTypography>
                        <Grid container>
                            <Grid item xs={6}>
                                <PropertyList properties={human}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Image
                                    src={human.img.values[0].label}
                                    disableSpinner
                                    className={classes.image}
                                    animationDuration={100}
                                >
                                </Image>
                            </Grid>
                        </Grid>
                        {expanded &&
                            <PropertyList properties={human}/>
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
