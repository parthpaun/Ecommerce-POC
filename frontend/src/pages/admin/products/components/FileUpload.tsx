import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IconButton, Box, Skeleton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { apiCall } from "../../../../utils/helperFunctions";

type FileResponse = {
  relativePath: string;
  path: string;
  fileName: string;
};

type FileUploadProps = {
  setValue: UseFormSetValue<ProductInputs>;
};

const FileUpload = ({ setValue }: FileUploadProps) => {
  const [previewImages, setPreviewImages] = useState<FileResponse[]>([]);
  const [loadingState, setLoadingState] = useState<Record<number, boolean>>({});

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const filesArray = Array.from(event.target.files);
    const formData = new FormData();
    formData.append("type", "product");
    filesArray.forEach((file) => formData.append("files", file));

    try {
      const index = previewImages.length;
      setLoadingState((prev) => ({ ...prev, [index]: true }));

      const response = await apiCall("POST", "/upload", formData, {
        "Content-Type": "multipart/form-data",
      });

      setLoadingState((prev) => ({ ...prev, [index]: false }));

      if (response.files) {
        const uploadedFiles = response.files as FileResponse[];
        setPreviewImages((prev) => [...prev, ...uploadedFiles]);
        setValue("files", [...previewImages, ...uploadedFiles], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setLoadingState((prev) => ({ ...prev, [previewImages.length]: false }));
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2} sx={{ my: 2 }}>
      {/* Display Uploaded Images */}
      {previewImages.map((file, index) => (
        <Box key={index} sx={{ position: "relative", width: 80, height: 80 }}>
          {loadingState[index] ? (
            <Skeleton variant="rectangular" width={80} height={80} />
          ) : (
            <img
              src={`${process.env.API_URL}${file.relativePath}`}
              alt={`preview-${index}`}
              width="80"
              height="80"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          )}
        </Box>
      ))}

      {/* File Upload Icon */}
      <Box>
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          id="file-upload"
          onChange={handleFileChange}
          disabled={Object.values(loadingState).some(Boolean)}
        />
        <label htmlFor="file-upload">
          <Box
            display="flex"
            sx={{
              py: 2,
              px: 4,
              border: "1px dashed",
              borderRadius: 2,
              width: 80,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <IconButton color="primary" component="span">
              <CloudUploadIcon fontSize="large" />
            </IconButton>
          </Box>
        </label>
      </Box>
    </Box>
  );
};

export default FileUpload;
