import React, {useEffect} from 'react';
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
import {SparQLTypography} from "../common/SparQLTypography";
import {AppModel, PropertyItem} from "../../state/AppModel";
import {useDispatch, useSelector} from "react-redux";
import {useConfigContext} from "../../state/ConfigContext";
import {GameActionCreator} from "../../state/GameActionCreator";
import {useModalContext} from "../modal/ModalContexProvider";
import {BaseHumanProps} from "../../wikidata/PropConfig";

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
            alignItems: "center",
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
    const {open} = useModalContext()
    const [baseHumanProps, setBaseHumanProps] = React.useState<PropertyItem[]>([]);
    const [extendHumanProps, setExtendHumanProps] = React.useState<PropertyItem[]>([]);
    const dispatch = useDispatch()
    const {hintCost, additionalHintCost} = useConfigContext()
    const { currentHuman } = useSelector((state: AppModel) => state)

    useEffect(() => {
        if(currentHuman){
            const base: PropertyItem[] = []
            const extend: PropertyItem[] = []
            Object.keys(currentHuman).forEach(key => {
                if(key !== "P18"){
                    if(BaseHumanProps.includes(key)){
                        base.push(currentHuman[key])
                    }else{
                        extend.push(currentHuman[key])

                    }
                }
            })
            setBaseHumanProps(base)
            setExtendHumanProps(extend)
        }
    }, [currentHuman])

    useEffect(() => {
        if(open) {
            setHidden(true)
        }
    }, [open])

    const handleExpandClick = () => {
        setExpanded(!expanded);
        dispatch(GameActionCreator.changePoint(additionalHintCost))
    };

    const handleCardClick = () => {
        setHidden(true);
        dispatch(GameActionCreator.changePoint(hintCost))
    };


    return (
        <Card className={classes.card}>
            {hidden && currentHuman ?
                <>
                    <CardContent className={classes.content}>
                        <SparQLTypography variant="h4" color="textPrimary" className={classes.name} code={currentHuman.name.values[0].code}>
                            {currentHuman.name.values[0].label}
                        </SparQLTypography>
                        <Grid container>
                            <Grid item xs={6}>
                                <PropertyList properties={baseHumanProps}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Image
                                    src={currentHuman["P18"].values[0].label}
                                    disableSpinner
                                    className={classes.image}
                                    animationDuration={100}
                                >
                                </Image>
                            </Grid>
                        </Grid>
                        {expanded &&
                            <PropertyList properties={extendHumanProps} />
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
