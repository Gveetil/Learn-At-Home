import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';
import DropboxHelper from "../../utils/DropboxHelper";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {
        "&:last-child > div:last-child": {
            paddingBottom: 0,
        }
    },
}));

// The URL List Control 
export default function URLViewer(props) {
    const classes = useStyles();

    async function loadDropboxFile(event, dropboxFileId, fileType) {
        event.preventDefault();
        const fileUrl = await DropboxHelper.downloadFile(dropboxFileId, fileType);
        if (fileUrl)
            window.open(fileUrl);
    }

    return (
        <Box className={classes.root} pb={props.pb || 0} pt={props.pt || 1}>
            {(props.value.map((urlItem, index) =>
                <Box display="flex" p={0} alignItems="center" pb={1} key={index}>
                    <Box display="flex" flexGrow={1}>
                        {urlItem.dropboxFileId &&
                            <Link target="_blank" color="secondary" variant="body2" key={index} href="#"
                                onClick={(event) => loadDropboxFile(event, urlItem.link, urlItem.fileType)}>{urlItem.title}</Link>}
                        {!urlItem.dropboxFileId &&
                            <Link target="_blank" color="secondary" variant="body2" key={index}
                                href={urlItem.link}>{urlItem.title}</Link>}
                    </Box>
                </Box>
            )
            )}
        </Box>
    );
}