import { Dropbox } from 'dropbox';
import path from 'path';

// Fetch Access Token from the environment variables
var ACCESS_TOKEN = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN;
const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

// Downloads a file from dropbox and returns a link to open it
async function downloadFile(path, fileType) {
    try {
        const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
        const data = await dbx.filesDownload({ path });
        let blob = new Blob([data.fileBlob], { type: fileType });
        blob.name = data.name;
        return URL.createObjectURL(blob);

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

// Uploads a set of files to dropbox and returns the details as an array
async function uploadFiles(files) {
    const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    const uploaded = [];
    for (const file of files) {
        const uploadedFile = await uploadFile(dbx, file);
        uploaded.push(uploadedFile);
    }
    return uploaded;
}

// Upload a given file to dropbox and return the details as an object
async function uploadFile(dbx, file) {
    // File is smaller than 150 Mb 
    if (file.size > UPLOAD_FILE_SIZE_LIMIT)
        throw Error("File too large to upload!");

    const dbxFileName = getUniqueFileName(file.name);

    const response = await dbx.filesUpload({
        path: `/${dbxFileName}`,
        contents: file
    });

    return {
        title: file.name,
        dropboxFileId: dbxFileName,
        link: response.path_lower,
        fileType: file.type,
    };
}

// Returns a unique file name based on the file name passed in
function getUniqueFileName(filename) {
    const timeStamp = Date.now();
    const ext = path.extname(filename);
    const baseFileName = path.basename(filename, ext);
    return `${baseFileName}_${timeStamp}${ext}`;
}

export default { UPLOAD_FILE_SIZE_LIMIT, uploadFiles, downloadFile }