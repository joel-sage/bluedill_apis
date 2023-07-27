const path = require("path");
require("dotenv").config();
const convertApi = require("convertapi")(process.env.NODE_CONVERT_API_KEY);
const getExtension = (filename) => {
  const documentExtension = path.extname(filename);
  const fileAbsoluteName = filename.split(".")[0];
  return { documentExtension, fileAbsoluteName };
};

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

const fileConverterManager = async (
  convertFromFileDIR,
  convertTo,
  saveToDir,
  filename,
  res
) => {
  try {
    const result = await convertApi.convert(convertTo, {
      File: convertFromFileDIR,
    });
    const convertedFileServerURL = result.file.url;
    const convertedFileLocalURL = await result.file.save(
      saveToDir + filename + "." + convertTo
    );
    res
      .status(200)
      .json({
        serverURL: convertedFileServerURL,
        localURL: convertedFileLocalURL,
      });
  } catch (e) {
    console.error(e.toString());
  }
};

module.exports = {
  getExtension,
  getDirectory,
  getWorkingDirectory,
  fileUploadToDIR,
  fileConverterManager,
};
