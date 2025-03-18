import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton, Avatar, Paper } from "@mui/material";
import { Delete, CloudUpload, AddCircleOutline } from "@mui/icons-material";

interface ImageUploadProps {
  images: ImageData[];
  setImages: (files: File[]) => void;
  deleteImage: (imageData: ImageData) => void;
  isMultiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  setImages,
  deleteImage,
  isMultiple = true,
}) => {
  const [, setHoverIndex] = useState<number | null>(null); // Track hovered image

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImages([...acceptedFiles]);
    },
    [images, setImages]
  );

  const removeImage = (file: ImageData) => {
    deleteImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: isMultiple,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        className="mageUpload"
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          overflowY: "auto",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Image Previews */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowY: "auto",
            maxWidth: "100%",
            maxHeight: "150px",
            paddingBottom: "10px",
            scrollSnapType: "x mandatory",
            whiteSpace: "wrap",
            flexWrap: "wrap",
            alignItems: `${isMultiple ? "flex-start" : "center"}`,
            justifyContent: `${isMultiple ? "flex-start" : "center"}`,
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
              border: "2px solid #f9f9f9",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
            },
          }}
        >
          {images.map((file, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100px",
                height: "100px",
                borderRadius: 2,
                overflow: "hidden",
                "&:hover .image-preview": { filter: "blur(5px)" }, // Blur on hover
                "&:hover .delete-overlay": { opacity: 1 }, // Show delete button on hover
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Image Preview */}
              <Avatar
                src={file.imageUrl}
                variant="rounded"
                className="image-preview"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 2,
                  transition: "filter 0.3s ease-in-out",
                }}
              />

              {/* Delete Button with Improved Visibility */}
              <Box
                className="delete-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <IconButton
                  onClick={() => removeImage(file)}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent glass effect
                    color: "#fff",
                    backdropFilter: "blur(8px)", // Stronger blur for visibility
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Depth for better visibility
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter hover effect
                    },
                  }}
                >
                  <Delete fontSize="medium" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
        {!(!isMultiple && images.length > 0) &&
          (images.length === 0 ? (
            <Paper
              {...getRootProps()}
              sx={{
                border: "2px dashed rgba(200, 200, 200, 0.6)",
                padding: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <input {...getInputProps()} />
              <CloudUpload sx={{ fontSize: 40, color: "#666" }} />
              <Typography variant="body1" color="textPrimary">
                Drag & drop images here, or click to select files
              </Typography>
            </Paper>
          ) : (
            <Paper
              {...getRootProps()}
              sx={{
                // minWidth: "7rem",
                // minHeight: "7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(200, 200, 200, 0.6)",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <input {...getInputProps()} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AddCircleOutline sx={{ fontSize: 40, color: "#666" }} />
              </Box>
            </Paper>
          ))}
      </Box>
      {/* ) */}
    </Box>
  );
};

export default ImageUpload;
