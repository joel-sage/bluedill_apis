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
    const { filename, error } = await fileUploadToDIR(
      "/public/imageUpload/",
      req,
      res
    );
 
    if (error) {
      res.status(200).json({ error: "Error encountered" });
    }
    const fileFormat = req.body.format;
    const {documentExtension , fileAbsoluteName} = getExtension(filename);
    const imageDIR = getDirectory("/public/imageUpload/");
    const imageDIRConvertedSave = getDirectory("/public/convertedFile/");
    const convertFileFormat = fileFormat.toLowerCase();
    switch (convertFileFormat) {
      case "pdf":
        {
     await fileConverterManager(
            imageDIR + filename,
            "pdf",
            imageDIRConvertedSave,
            fileAbsoluteName,
            res
          );
        }
        break;
      case "docx":
        {
      await  fileConverterManager(
            imageDIR + filename,
            "docx",
            imageDIRConvertedSave,
            fileAbsoluteName,
            res
          );
        }
        break;
      case "xl":
        {
     await fileConverterManager(
            imageDIR + filename,
            "pdf",
            imageDIRConvertedSave,
            fileAbsoluteName,
            res
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
 