import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AppTreeItem from "./AppTreeItem";

import theme from '../../utils/theme';

// Styles used by this component
const useStyles = makeStyles({
    root: {
        height: 264,
        padding: theme.spacing(1),
        flexGrow: 1,
        width: theme.leftNavBarWidth,
    },
});

// The Tree View Control used by the Left Navigation Panel
function AppTreeView(props) {
    const classes = useStyles();
    const defaultSelected = `${props.location.pathname}${props.location.search}`

    return (
        <TreeView
            className={classes.root}
            defaultExpanded={props.defaultExpanded}
            selected={defaultSelected}
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
                key={item.id}
                linkTo={item.link}
                nodeId={item.link}
                labelText={item.title}
                labelIcon={item.icon}>
                {renderTreeItems(item.options)}
            </AppTreeItem>);
        } else {
            return (<AppTreeItem
                key={item.id}
                linkTo={item.link}
                nodeId={item.link}
                labelText={item.title}
                labelIcon={item.icon}
            />);
        }
    });
}

export default withRouter(AppTreeView);
