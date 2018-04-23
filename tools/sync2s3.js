const fs = require('fs');
const path = require('path');
const mime = require('mime');
const AWS = require('aws-sdk');

const BUCKET = process.env.S3_BUCKET;
const s3 = new AWS.S3();
let params = {
    Bucket: BUCKET
};

const DIST_FOLDER = 'build';

console.log('Uploading to :'  + BUCKET);

if (!BUCKET || BUCKET.length < 1) {
    console.log('ERROR INVALID BUCKET: ' + BUCKET);
    process.exit(1);
}

let walkSync = function(dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        }
        else {
            filelist.push(path.resolve(path.join(dir, file)));
        }
    });
    return filelist;
};

let makeRelative = function(base, files) {
    let results = [];
    files.forEach(file => {
        results.push(file.replace(base + '/', ''));
    });
    return results;
}

// These are the files in our build folder that we want to mirror to S3
let distFiles = walkSync(`./${DIST_FOLDER}`);
let buildDir = path.join(path.resolve(path.resolve(__dirname, '../')), 'build');
distFiles = makeRelative(buildDir, distFiles);
console.log('distFiles: ' + JSON.stringify(distFiles));

// Generate a list of upload promises for each local file
let uploads = [];
distFiles.forEach(distFile => {

    let fileName = `./${DIST_FOLDER}/${distFile}`;
    let contentType = mime.getType(fileName);
    console.log(`Uploading ${distFile}...(${contentType})`);
    let fileContent = fs.readFileSync(fileName);
    uploads.push(s3.putObject({
        Bucket: BUCKET,
        Key: distFile,
        ContentType: contentType,
        Body: fileContent
    }).promise());
});

// Wait on all of the uploads to finish, then check for files in S3 that aren't
// in our dist directory
Promise.all(uploads).then(() => {
    console.log(`Uploaded ${distFiles.length} files!`);

    s3.listObjects({
        Bucket: BUCKET
    }, function(err, data) {
        console.log('ERROR: ' + JSON.stringify(err));
        let s3Files = data.Contents;
        s3Files.forEach(s3File => {
            let shouldDeleteFromS3 = (distFiles.indexOf(s3File.Key) < 0);
            if (shouldDeleteFromS3) {
                console.log(`Deleting ${s3File.Key}...`);
                s3.deleteObject({
                    Bucket: BUCKET,
                    Key: s3File.Key
                }, function(err, data) {
                    if (err) {
                        console.log('ERROR Deleting file: ' + err);
                    }
                });
            }
        });
    });
}).catch(err => {
    console.log('Error: ' + JSON.stringify(err));
});
