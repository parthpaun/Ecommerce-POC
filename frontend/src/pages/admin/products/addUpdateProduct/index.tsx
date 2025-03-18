import { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Delete, Inventory, ExpandMore } from "@mui/icons-material";
import ImageUpload from "../../../../components/admin/ImageUpload";
import { apiCall } from "../../../../utils/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getCategories } from "../../../../redux/admin/category/categoryAction";

const ProductForm = ({ isUpdateProduct }: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<FormValues>({
      defaultValues: {
        name: "",
        description: "",
        category: "",
        basePrice: "",
        discount: "",
        variations: [],
        images: [],
        specifications: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });
  const [images, setImages] = useState<ImageData[]>([]);
  const [, setImageIsUploading] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<Record<string, string>[]>([]);
  const [specifications, setSpecifications] = useState<
    { section: string; attributes: { key: string; value: string }[] }[]
  >([]);

  // Add a new specification section
  const addSpecificationSection = () => {
    setSpecifications([...specifications, { section: "", attributes: [] }]);
  };

  // Update section title
  const updateSpecificationTitle = (index: number, value: string) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index].section = value;
    setSpecifications(updatedSpecs);
  };

  // Add a key-value pair to a section
  const addKeyValuePair = (index: number) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index].attributes.push({ key: "", value: "" });
    setSpecifications(updatedSpecs);
  };

  // Update a key-value pair
  const updateKeyValue = (
    sectionIndex: number,
    keyIndex: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[sectionIndex].attributes[keyIndex][field] = value;
    setSpecifications(updatedSpecs);
  };

  // Remove a key-value pair
  const removeKeyValuePair = (sectionIndex: number, keyIndex: number) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[sectionIndex].attributes.splice(keyIndex, 1);
    reset({ specifications: updatedSpecs });
    setSpecifications(updatedSpecs);
  };

  // Remove an entire section
  const removeSpecificationSection = (index: number) => {
    const updatedSpecs = [...specifications];
    updatedSpecs.splice(index, 1);
    reset({ specifications: updatedSpecs });
    setSpecifications(updatedSpecs);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.adminCategory.categories);

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

                fontSize: "large",
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
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Brand name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Brand"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Box>
        </Grid>
        {/* Product Images  */}
        <Grid item sm={12} md={6}>
          <Box
            display={"flex"}
            flexDirection={"column"}
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

                fontSize: "large",
              }}
            >
              Product Images
            </Typography>
            <Box
              sx={{
                my: 2,
                height: "100%",
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
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: "large",
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
                  rules={{
                    required: "Base price is required",
                    min: {
                      value: 0,
                      message: "Nagative value is not allowed",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Base Price"
                      type="number"
                      fullWidth
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="discount"
                  control={control}
                  rules={{
                    min: {
                      value: 0,
                      message: "Nagative value is not allowed",
                    },
                    max: {
                      value: 100,
                      message: "Discount cannot exceed 100%",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Discount"
                      type="number"
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
                  rules={{
                    required: "Stock details is required",
                    min: {
                      value: 0,
                      message: "Nagative value is not allowed",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Stock"
                      type="number"
                      fullWidth
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="sku"
                  control={control}
                  rules={{ required: "sku is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="sku"
                      type="string"
                      fullWidth
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
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
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: "large",
              }}
            >
              Category
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth sx={{ my: 2 }}>
                      <InputLabel id="demo-simple-select-label">
                        category
                      </InputLabel>
                      <Select
                        {...field}
                        label="category"
                        fullWidth
                        error={!!fieldState.error}
                        onChange={(e) => {
                          field.onChange(e);
                          const selectedCategory = categories.find(
                            (category) => category._id === e.target.value
                          );
                          setAttributes(selectedCategory?.attributes || []);
                        }}
                      >
                        {categories.map((category) => {
                          return (
                            <MenuItem value={category._id}>
                              {category?.name}
                            </MenuItem>
                          );
                        })}
                        f
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {!!attributes.length && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Product Pricing and Stock Information  */}
          <Grid item md={12} sm={12}>
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
              <Box display={"flex"} justifyContent="space-between" width="100%">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: "large",
                  }}
                >
                  Product Variations
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => {
                    let defaultValues = {};
                    attributes.forEach(
                      (attribute) =>
                        (defaultValues = {
                          ...defaultValues,
                          [attribute.name]: "",
                        })
                    );
                    append({ ...defaultValues });
                  }}
                  sx={{ mt: 2 }}
                  color="secondary"
                >
                  Add
                </Button>
              </Box>
              {/* Base Price & Discount Price */}
              {fields.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    border: "1px solid #ddd",
                    p: 2,
                    my: 1,
                    borderRadius: 2,
                    width: "100%",
                  }}
                  display="flex"
                  flexDirection={"column"}
                  // flexWrap={"wrap"}
                >
                  <Box sx={{ padding: 1, marginBottom: 1 }}>
                    <Typography variant="subtitle1">{`Variation ${
                      index + 1
                    }`}</Typography>
                  </Box>
                  <Box display={"flex"}>
                    <Box display={"flex"} gap={1} flexWrap={"wrap"}>
                      {attributes.map((attribute) => (
                        <Box>
                          <Controller
                            name={`variations.${index}.${attribute.name}`}
                            control={control}
                            rules={{
                              required: `${attribute.name} is required`,
                            }}
                            render={({ field, fieldState }) => (
                              <TextField
                                {...field}
                                label={`${attribute.name}`}
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            )}
                          />
                        </Box>
                      ))}
                      <Box>
                        <Controller
                          name={`variations.${index}.price`}
                          control={control}
                          rules={{
                            required: "Price is required",
                            min: {
                              value: 0,
                              message: "Nagative value is not allowed",
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              label="Price"
                              type="number"
                              fullWidth
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Box>
                      <Box>
                        <Controller
                          name={`variations.${index}.discount`}
                          control={control}
                          rules={{
                            required: "Discount is required",
                            min: {
                              value: 0,
                              message: "Nagative value is not allowed",
                            },
                            max: {
                              value: 100,
                              message: "Discount cannot exceed 100%",
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              label="Discount"
                              type="number"
                              fullWidth
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              InputProps={{
                                inputProps: { min: 0, max: 100 },
                                endAdornment: (
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 50 }}
                                  >
                                    %
                                  </Typography>
                                ),
                              }}
                            />
                          )}
                        />
                      </Box>
                      <Box>
                        <Controller
                          name={`variations.${index}.stock`}
                          control={control}
                          rules={{
                            required: "Stock is required",
                            min: {
                              value: 0,
                              message: "Nagative value is not allowed",
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              label="Stock"
                              type="number"
                              fullWidth
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => remove(index)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* Product Pricing and Stock Information  */}
        <Grid item md={12} sm={12}>
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
            <Box display={"flex"} justifyContent="space-between" width="100%">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "large",
                }}
              >
                Product Specifications
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => {
                  addSpecificationSection();
                }}
                sx={{ mt: 2 }}
                color="secondary"
              >
                Add Section
              </Button>
            </Box>
            <Box marginTop={2}>
              {specifications.map((spec, index) => (
                <Accordion key={index} sx={{ mt: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Controller
                      name={`specifications.${index}.section`}
                      control={control}
                      rules={{ required: "Specification title is required" }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Specification Title"
                          fullWidth
                          variant="standard"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onChange={(e) => {
                            field.onChange(e);
                            updateSpecificationTitle(index, e.target.value);
                          }}
                        />
                      )}
                    />
                    <IconButton
                      onClick={() => removeSpecificationSection(index)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </AccordionSummary>
                  <AccordionDetails>
                    {spec.attributes.length === 0 && (
                      <Typography color="error" variant="body2">
                        Each section must have at least one attribute.
                      </Typography>
                    )}
                    {spec.attributes.map((detail, keyIndex) => (
                      <Box
                        key={keyIndex}
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Controller
                          name={`specifications.${index}.attributes.${keyIndex}.key`}
                          control={control}
                          rules={{ required: "Key is required" }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              label="Key"
                              variant="outlined"
                              size="small"
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              onChange={(e) => {
                                field.onChange(e);
                                updateKeyValue(
                                  index,
                                  keyIndex,
                                  "key",
                                  e.target.value
                                );
                              }}
                            />
                          )}
                        />
                        <Controller
                          name={`specifications.${index}.attributes.${keyIndex}.value`}
                          control={control}
                          rules={{ required: "Value is required" }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              label="Value"
                              variant="outlined"
                              size="small"
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              onChange={(e) => {
                                field.onChange(e);
                                updateKeyValue(
                                  index,
                                  keyIndex,
                                  "value",
                                  e.target.value
                                );
                              }}
                            />
                          )}
                        />
                        <IconButton
                          onClick={() => removeKeyValuePair(index, keyIndex)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      onClick={() => addKeyValuePair(index)}
                      variant="contained"
                      color="primary"
                    >
                      + Add Attribute
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box display={"flex"} justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          color="secondary"
        >
          {isUpdateProduct ? "Update Product" : "Add Product"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
