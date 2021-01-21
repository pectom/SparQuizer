import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Divider, List, ListItem, ListItemProps} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            color: "#3d3636",
            width: "50%"
        }
    }),
);

interface QueryItem {
    name: string,
    code: string,
    link: string,
}

interface PropertyItem {
    property: QueryItem,
    values: QueryItem[]
}

interface ListItemLinkProps extends ListItemProps {
    sparqlProperty: PropertyItem
}

function ListItemLink(props: ListItemLinkProps) {
    const classes = useStyles();
    const {sparqlProperty} = props
    return (
        <>
            <ListItem>
                <Button href={sparqlProperty.property.link} target="_blank" color="inherit" className={classes.button}>
                    {sparqlProperty.property.name} {sparqlProperty.property.code}
                </Button>
                <List className={classes.button}>
                    {
                        sparqlProperty.values.map(property => {
                            return (
                                <Button href={property.link} target="_blank" color="inherit" className={classes.button}>
                                    {property.name} {property.code}
                                </Button>
                            )
                        })
                    }
                </List>
            </ListItem>
            <Divider/>
        </>
    );
}

export default function PropertyList() {
    const data: PropertyItem[] = [
        {
            property: {
                name: "sex or gender",
                code: "P21",
                link: "https://www.wikidata.org/wiki/Property:P21"
            },
            values: [
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                },
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                }]
        },
        {
            property: {
                name: "sex or gender",
                code: "P21",
                link: "https://www.wikidata.org/wiki/Property:P21"
            },
            values: [
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                },
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                }]
        },
        {
            property: {
                name: "sex or gender",
                code: "P21",
                link: "https://www.wikidata.org/wiki/Property:P21"
            },
            values: [
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                },
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                },
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                },
                {
                    name: "male",
                    code: "Q6581097",
                    link: "https://www.wikidata.org/wiki/Q6581097"
                }]
        },
    ]

    return (

        <List>
            {
                data.map(property => {
                    return <ListItemLink sparqlProperty={property}/>
                })
            }
        </List>
    );
}
