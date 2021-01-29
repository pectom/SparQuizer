import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Divider, List, ListItem, ListItemProps} from "@material-ui/core";
import {SparQLTypography} from "../common/SparQLTypography";
import {PropertyItem} from "../../model/app-model";
import {Human} from "../../query/humans";

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
                <SparQLTypography code={property.code}  >
                    {property.label}
                </SparQLTypography>
                <List className={classes.button}>
                    {
                        sparqlProperty.values.map(property => {
                            return (
                                <SparQLTypography code={property.code} >
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
    properties: Human
}

export default function PropertyList({properties}: PropertyListOptions) {
    return (
        <List>
            {
                Object.values(properties).map(property => {
                    return <ListItemLink sparqlProperty={property}/>
                })
            }
        </List>
    );
}
