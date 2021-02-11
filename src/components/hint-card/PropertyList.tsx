import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Divider, List, ListItem, ListItemProps} from "@material-ui/core";
import {SparQLTypography} from "../common/SparQLTypography";
import {PropertyItem} from "../../state/AppModel";
import * as _ from "lodash"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        property: {
            width: "170px",
            padding: "5px"
        },
        list: {
            width: "100%",
            borderLeft: "2px solid",
            borderLeftColor: theme.palette.grey.A100,
            padding: "5px"
        },
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
                <SparQLTypography code={property.code} className={classes.property}>
                    {_.startCase(_.camelCase(property.label))}
                </SparQLTypography>
                <List className={classes.list}>
                    {
                        sparqlProperty.values.map(property => {
                            return (
                                <SparQLTypography code={property.code} sparQLProperty>
                                    {property.label}
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
interface PropertyListOptions{
    properties: PropertyItem[]
}

export default function PropertyList({properties}: PropertyListOptions) {
    return (
        <List>
            {
                properties.map(property => {
                    return <ListItemLink sparqlProperty={property} />
                })
            }
        </List>
    );
}
