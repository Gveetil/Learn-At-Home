import React from 'react';
import { Box, Link } from '@material-ui/core';
import DropboxHelper from "../../utils/DropboxHelper";

// The URL List Control 
export default function URLViewer(props) {

    async function loadDropboxFile(event, dropboxFileId, fileType) {
        event.preventDefault();
        const fileUrl = await DropboxHelper.downloadFile(dropboxFileId, fileType);
        if (fileUrl)
            window.open(fileUrl);
    }

    return (
        <Box pt={1} >
            {(props.value.map((urlItem, index) =>
                <Box display="flex" p={0} pb={1} alignItems="center" key={index}>
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