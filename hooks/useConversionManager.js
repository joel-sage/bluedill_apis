const path = require("path");
require('dotenv').config();
const convertApi = require("convertapi")(process.env.NODE_CONVERT_API_KEY);
const getExtension = (filename) => path.extname(filename);

const getDirectory = (filePath) => path.join(process.cwd(), filePath);

const getWorkingDirectory = (filename) => path.join(__dirname, filename);

const fileUploadToDIR = (dirName, req, res) => {
  let error;
  const fileObject = req.files.file;
  const filename = fileObject.name;
  const newDirName = getDirectory(dirName);
  fileObject.mv(newDirName + filename, (err) => {
    if (err) {
      error = err;
    }
  });
  return { filename, error };
};

const fileConverterManager = (convertFromFileDIR, convertTo, saveToDir) => {
  convertApi
    .convert(convertTo, { File: convertFromFileDIR })
    .then(function (result) {
      // get converted file url
      console.log("Converted file url: " + result.file.url);
      // save to file
      return result.file.save(saveToDir + "." + convertTo);
    })
    .then(function (file) {
      console.log("File saved: " + file);
    })
    .catch(function (e) {
      console.error(e.toString());
    });
};

module.exports = {
  getExtension,
  getDirectory,
  getWorkingDirectory,
  fileUploadToDIR,
  fileConverterManager,
};
