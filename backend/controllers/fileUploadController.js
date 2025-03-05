const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadFileWithS3 = async (req, res) => {
  try {
    const uploadedFiles = [];
    let files = req.files;
    if (!Array.isArray(files)) {
      files = [files];
    }
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    // Setting up S3 upload parameters

    for (const file of files) {
      const fileName = `${
        req.params.type ? `${req.params.type}/` : ""
      }${Date.now().toString()}_${file.originalname}`;
      
      // Loop through all files
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);

      uploadedFiles.push({
        fileName: file.originalname,
        key: fileName
      });
    }
    res.status(200).json({
      message: "Files uploaded successfully",
      images: uploadedFiles, // Send only URLs
    });
  } catch (err) {
    res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};

const getSignedUrlForFile = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
};

module.exports = {
  uploadFileWithS3,
  getSignedUrlForFile,
};
