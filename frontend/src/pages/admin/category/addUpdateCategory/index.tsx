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
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Category, Delete } from "@mui/icons-material";
import ImageUpload from "../../../../components/admin/ImageUpload";
import { apiCall } from "../../../../utils/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addCategory,
  getCategories,
} from "../../../../redux/admin/category/categoryAction";

const CategoryForm = ({ isUpdate }: CategoryFormProps) => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: "",
        description: "",
        parentCategory: "",
        attributes: [],
        images: [],
      },
    });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.adminCategory.categories);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });
  const [images, setImages] = useState<ImageData[]>([]);
  const [, setImageIsUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    message: string;
    isError: boolean;
  }>({
    isOpen: false,
    message: "",
    isError: false,
  });

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
          "/upload/category",
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

  const onSubmit = (value: CategoryFormValues) => {
    const payload = {
      ...value,
      parentCategory: value.parentCategory || null,
      image: value.images[0]?.key || null,
    };
    dispatch(addCategory(payload))
      .then(() => {
        reset();
        setImages([]);
        setNotification({
          isOpen: true,
          message: "Category added successfully",
          isError: false,
        });
      })
      .catch((error) => {
        setNotification({
          isOpen: true,
          message: error.message,
          isError: true,
        });
      });
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", isOpen: false, isError: false });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      justifyContent={"space-between"}
      minHeight={"100%"}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          my: 2,
          alignItems: "center",
        }}
      >
        <Category fontSize="large" />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            ml: 1,
            fontSize: "x-large",
          }}
        >
          {isUpdate ? "Edit Category" : "Add New Category"}
        </Typography>
      </Box>
      <Grid container spacing={2}>
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
              rules={{ required: "Category name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Category Name"
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
              name="parentCategory"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth sx={{ my: 2 }} variant="outlined">
                  <InputLabel id="parent-category-label">
                    Parent Category
                  </InputLabel>
                  <Select
                    {...field}
                    label="Parent Category"
                    fullWidth
                    error={!!fieldState.error}
                    labelId="parent-category-label"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </Grid>
        {/* Category Image  */}
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

                fontSize: "x-large",
              }}
            >
              Category Image
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
                isMultiple={false}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item md={12} sm={12}>
          <Box
            sx={{
              p: 3,
              mx: "auto",
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "x-large",
                }}
              >
                Attributes
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => append({ name: "" })}
                color="secondary"
              >
                Add
              </Button>
            </Box>
            <Box display={"flex"} flexWrap={"wrap"} gap={2}>
              {fields.map((item, index) => (
                <Box key={item.id}>
                  <Box
                    key={item.id}
                    display={"flex"}
                    sx={{
                      border: "1px solid #ddd",
                      p: 2,
                      my: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Controller
                      name={`attributes.${index}.name`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Name"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                      rules={{ required: "Attribute name is required" }}
                    />
                    <IconButton onClick={() => remove(index)} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* attributes */}

      {/* Submit Button */}
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        sx={{ mt: 3 }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          color="secondary"
        >
          {isUpdate ? "Update Category" : "Add Category"}
        </Button>
      </Box>
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={2000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.isError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryForm;
