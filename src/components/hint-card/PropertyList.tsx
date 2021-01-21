import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Divider, List, ListItem, ListItemProps} from "@material-ui/core";
import {SparQLTypography} from "../common/SparQLTypography";
import {PropertyItem} from "../../model/app-model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            color: "#3d3636",
            width: "50%"
        }
    }),
);


interface ListItemLinkProps extends ListItemProps {
    sparqlProperty: PropertyItem
}

function ListItemLink(props: ListItemLinkProps) {
    const classes = useStyles();
    const {sparqlProperty} = props
    const {property} = sparqlProperty
    return (
        <>
            <ListItem>
                <SparQLTypography code={property.code} link={property.link} >
                    {property.name}
                </SparQLTypography>
                <List className={classes.button}>
                    {
                        sparqlProperty.values.map(property => {
                            return (
                                <SparQLTypography code={property.code} link={property.link} >
                                    {property.name}
                                </SparQLTypography>
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
