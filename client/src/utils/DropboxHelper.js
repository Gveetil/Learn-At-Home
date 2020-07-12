import { Dropbox } from 'dropbox';

// Fetch Access Token from the environment variables
var ACCESS_TOKEN = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN;
const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

// Uploads a set of files to dropbox and returns the details as an array
async function uploadFiles(files) {
    try {
        const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
        const uploaded = [];
        for (const file of files) {
            const uploadedFile = await uploadFile(dbx, file);
            uploaded.push(uploadedFile);
        }
        return uploaded;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

// Upload a given file to dropbox and return the details as an object
async function uploadFile(dbx, file) {
    // File is smaller than 150 Mb 
    if (file.size > UPLOAD_FILE_SIZE_LIMIT)
        throw Error("File too large to upload!");
    const response = await dbx.filesUpload({
        path: '/' + file.name,
        contents: file
    });
    return {
        title: file.name,
        dropboxFileId: response.id,
        link: response.name,
        fileType: file.type,
    };
}

export default { UPLOAD_FILE_SIZE_LIMIT, uploadFiles }