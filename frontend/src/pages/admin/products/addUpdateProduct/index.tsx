import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Add, Delete, Inventory } from "@mui/icons-material";
import ImageUpload from "../../../../components/admin/ImageUpload";
import { apiCall } from "../../../../utils/helperFunctions";

const ProductForm = ({ isUpdateProduct }: ProductFormProps) => {
  const { control, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      basePrice: "",
      discount: "",
      variations: [],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });
  const [images, setImages] = useState<ImageData[]>([]);
  const [, setImageIsUploading] = useState<boolean>(false);

  const handleImageUpload = async (uploadFiles: File[]) => {
    if (uploadFiles) {
      const files = Array.from(uploadFiles);
      const imageFormData = new FormData();
      if (files.length > 0) {
        setImageIsUploading(true);
        files.forEach((file) => {
          imageFormData.append("images", file);
        });
        const uploadedImages = await apiCall(
          "POST",
          "/upload/product",
          imageFormData,
          { "Content-Type": "multipart/form-data" }
        );
        setImageIsUploading(false);
        if (uploadedImages.images) {
          const imageWithPreview = uploadedImages.images.map(
            (image: FileResponse, index: number) => ({
              ...image,
              imageUrl: URL.createObjectURL(files[index]),
            })
          );
          const existingImages = getValues("images");
          const allImages = [...existingImages, ...imageWithPreview];
          setValue("images", allImages);
          setImages(allImages);
        }
      }
    }
  };

  const deleteImage = (data: ImageData) => {
    const updatedImages = images.filter(
      (imageData) => imageData.key !== data.key
    ); // Remove image preview
    setValue("images", updatedImages);
    setImages(updatedImages);
  };

  const onSubmit = (value: FormValues) => {
    console.log("first", value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          my: 2,
          alignItems: "center",
        }}
      >
        <Inventory fontSize="large" />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            ml: 1,
            fontSize: "x-large",
          }}
        >
          {isUpdateProduct ? "Edit Product" : "Add New Product"}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {/* Product General Information  */}
        <Grid item md={6} sm={12}>
          <Box
            sx={{
              p: 3,
              mx: "auto",
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",

                fontSize: "x-large",
              }}
            >
              General Information
            </Typography>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                />
              )}
            />
          </Box>
        </Grid>
        {/* Product Images  */}
        <Grid item sm={12} md={6}>
          <Box
            sx={{
              p: 3,
              mx: "auto",
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",

                fontSize: "x-large",
              }}
            >
              Product Images
            </Typography>
            <Box
              sx={{
                my: 2,
              }}
            >
              <ImageUpload
                images={images}
                setImages={handleImageUpload}
                deleteImage={deleteImage}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* Product Pricing and Stock Information  */}
        <Grid item md={6} sm={12}>
          <Box
            sx={{
              p: 3,
              mx: "auto",
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",

                fontSize: "x-large",
              }}
            >
              Pricing And Stock
            </Typography>
            {/* Base Price & Discount Price */}
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Controller
                  name="basePrice"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Base Price"
                      type="string"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Discount"
                      type="string"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <Typography variant="h6" sx={{ fontWeight: 50 }}>
                            %
                          </Typography>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Controller
                  name="stock"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Stock"
                      type="string"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="sku"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="sku"
                      type="string"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item md={6} sm={12}>
          <Box
            sx={{
              p: 3,
              mx: "auto",
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",

                fontSize: "x-large",
              }}
            >
              Category
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={10}
                  label="Age"
                  fullWidth
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Variations */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Product Variations
      </Typography>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          sx={{ border: "1px solid #ddd", p: 2, my: 1, borderRadius: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Controller
                name={`variations.${index}.color`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Color" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`variations.${index}.size`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Size" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`variations.${index}.storage`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Storage" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`variations.${index}.price`}
                control={control}
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <TextField {...field} label="Price" type="number" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`variations.${index}.discountPrice`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount Price"
                    type="number"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`variations.${index}.stock`}
                control={control}
                rules={{ required: "Stock is required" }}
                render={({ field }) => (
                  <TextField {...field} label="Stock" type="number" fullWidth />
                )}
              />
            </Grid>
          </Grid>
          <IconButton onClick={() => remove(index)} color="error">
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => append({ price: 0, stock: 0 })}
        sx={{ mt: 2 }}
      >
        Add Variation
      </Button>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        {isUpdateProduct ? "Update Product" : "Create Product"}
      </Button>
    </Box>
  );
};

export default ProductForm;
