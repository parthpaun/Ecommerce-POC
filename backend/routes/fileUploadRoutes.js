const express = require("express");
const router = express.Router();
const fileUploadController = require("../controllers/fileUploadController");

router.post("/:type", fileUploadController.uploadFileWithS3);


module.exports = router;
