import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AppTreeItem from "../components/AppTreeItem";

import theme from '../utils/theme';

// Styles used by this component
const useStyles = makeStyles({
    root: {
        height: 264,
        padding: theme.spacing(1),
        flexGrow: 1,
        width: 240,
    },
});

// The Tree View Control used by the Left Navigation Panel
export default function AppTreeView(props) {
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultExpanded={props.defaultExpanded}
            defaultSelected={props.defaultSelected}
            multiSelect={false}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            {renderTreeItems(props.items)}
        </TreeView>
    );
}

// Renders items in the tree view recursively based on the array passed in
function renderTreeItems(items) {
    return items.map((item, index) => {
        if (item.options) {
            return (<AppTreeItem
                linkTo={item.link}
                nodeId={item.id}
                labelText={item.title}
                color={item.color || "#3c8039"}
                bgColor={item.bgColor || "#e6f4ea"}
                labelIcon={item.icon}>
                {renderTreeItems(item.options)}
            </AppTreeItem>);
        } else {
            return (<AppTreeItem
                linkTo={item.link}
                nodeId={item.id}
                labelText={item.title}
                color={item.color || "#3c8039"}
                bgColor={item.bgColor || "#e6f4ea"}
                labelIcon={item.icon}
            />);
        }
    });
}
