import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.navigation.text,
        '&:hover > $content': {
            backgroundColor: theme.palette.navigation.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: theme.palette.navigation.background,
            color: theme.palette.navigation.selected,
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.navigation.text,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

// The Tree View Item properties
AppTreeItem.propTypes = {
    labelIcon: PropTypes.elementType.isRequired,
    labelText: PropTypes.string.isRequired,
    linkTo: PropTypes.string,
};

// The Tree View Item used by the Tree View Control
export default function AppTreeItem(props) {
    const classes = useStyles();
    let history = useHistory();
    const { labelText, labelIcon: LabelIcon, linkTo, ...other } = props;

    return (
        <TreeItem
            onClick={() => (linkTo !== "") ? history.push(linkTo) : ""}
            label={
                < div className={classes.labelRoot} >
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                </div >
            }
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}