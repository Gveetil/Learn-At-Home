import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AppTreeItem from "../components/AppTreeItem";

// Styles used by this component
const useStyles = makeStyles({
    root: {
        height: 264,
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
            // defaultExpanded={['3']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            {renderTreeItems(props.items)}
        </TreeView>
    );
}

function renderTreeItems(items) {
    return items.map((item, index) => {
        if (item.options) {
            return (<AppTreeItem
                nodeId={item.id}
                labelText={item.title}
                color="#3c8039"
                bgColor="#e6f4ea"
                labelIcon={item.icon}>
                {renderTreeItems(item.options)}
            </AppTreeItem>);
        } else {
            return (<AppTreeItem
                nodeId={item.id}
                labelText={item.title}
                color="#3c8039"
                bgColor="#e6f4ea"
                labelIcon={item.icon}
            />);
        }
    });
}
