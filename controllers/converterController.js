const path = require("path");
const {
  getExtension,
  getDirectory,
  getWorkingDirectory,
  fileUploadToDIR,
  fileConverterManager,
} = require("../hooks/useConversionManager.js");

const converterFile = async (req, res) => {
  try {
    const { filename, error } = fileUploadToDIR(
      "/public/imageUpload/",
      req,
      res
    );
 
    if (error) {
      res.status(200).json({ error: "Error encountered" });
    }
    const documentExtension = getExtension(filename);
    const documentExtensionLower = documentExtension.toLowerCase();
    const imageDIR = getDirectory("/public/imageUpload/");
    const imageDIRConvertedSave = getDirectory("/public/convertedFile/");
    switch (documentExtensionLower) {
      case ".docx":
        {
          fileConverterManager(
            imageDIR + filename,
            "pdf",
            imageDIRConvertedSave
          );
        }
        break;
      case ".pdf":
        {
          fileConverterManager(
            imageDIR + filename,
            "docx",
            imageDIRConvertedSave
          );
        }
        break;
      case ".xl":
        {
          fileConverterManager(
            imageDIR + filename,
            "pdf",
            imageDIRConvertedSave
          );
        }
        break;
      default:
        res.status(404).json({ msg: "file format not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  converterFile,
};
 