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
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Delete, Category, ArrowBack } from "@mui/icons-material";
import ImageUpload from "../../../../components/admin/ImageUpload";
import { apiCall } from "../../../../utils/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../../../redux/admin/category/categoryAction";
import { useNavigate, useParams } from "react-router-dom";

const CategoryForm = ({ isUpdate }: CategoryFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId } = useParams<{ categoryId: string }>(); // ✅ ADDED
  const category = useAppSelector((state) => state.adminCategory.category);

  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: "",
        description: "",
        parentCategory: "",
        attributes: [],
        image: null,
      },
    });

  useEffect(() => {
    if (category) {
      reset({
        name: category?.name || "",
        description: category?.description || "",
        parentCategory: category?.parentCategory?._id || "",
        attributes: Array.isArray(category?.attributes)
          ? category.attributes
          : [],
        image: category?.image || null,
      });
    }
    // category.image is a string (key only), so we can't populate the images array with url
    // The images array will be populated when the user uploads a new image
    setImages(
      category?.image
        ? [
            {
              key: category.image.key ?? null,
              name: category.image.name ?? null,
              url: category.image.url ?? null,
              imageUrl: category.image.url ?? null,
            },
          ]
        : [],
    );
  }, [category, reset]);

  useEffect(() => {
    if (isUpdate && categoryId) {
      dispatch(getCategoryById(categoryId));
    }
  }, [dispatch, isUpdate, categoryId]);
  useEffect(() => {
    dispatch(getCategories(categoryId));
  }, [dispatch, categoryId]);

  const categories = useAppSelector((s) => s.adminCategory.categories);
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const [images, setImages] = useState<ImageItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleImageUpload = async (uploadFiles: File[]) => {
    // Prevent multiple simultaneous uploads
    if (isUploading) {
      return;
    }

    const files = Array.from(uploadFiles);
    if (files.length === 0) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f));

      const res = await apiCall("POST", "/upload/category", formData, {
        "Content-Type": "multipart/form-data",
      });

      if (res.images) {
        const mapped = res?.images?.map((img: FileResponse, i: number) => ({
          ...img,
          imageUrl: URL.createObjectURL(files[i]),
        }));
        setValue("image", mapped[0] || null);
        setImages(mapped);
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to upload image!",
        isError: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = () => {
    setValue("image", null);
    setImages([]);
  };

  const onSubmit = (data: CategoryFormValues) => {
    const payload = {
      ...data,
      parentCategory: data.parentCategory
        ? categories.find((c) => c._id === data.parentCategory)
        : null,
      image: getValues("image"),
      attributes: data?.attributes?.map((a) => ({
        name: a.name,
        options: a.options,
      })),
    };

    if (isUpdate && categoryId) {
      dispatch(updateCategory({ ...payload, id: categoryId }))
        .then(() => {
          setNotification({
            isOpen: true,
            message: "Category updated successfully!",
            isError: false,
          });
          setTimeout(() => {
            navigate("/admin/categories");
          }, 1000);
        })
        .catch((e) =>
          setNotification({ isOpen: true, message: e.message, isError: true }),
        );
      return;
    } else {
      dispatch(addCategory(payload))
        .then(() => {
          reset();
          setImages([]);
          setNotification({
            isOpen: true,
            message: "Category saved successfully!",
            isError: false,
          });
        })
        .catch((e) =>
          setNotification({ isOpen: true, message: e.message, isError: true }),
        );
    }
  };

  const confirmDeleteAttribute = () => {
    if (deleteIndex !== null) {
      remove(deleteIndex);
      setDeleteIndex(null);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 2,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* BACK NAVIGATION */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={() => navigate("/admin/categories")}
          color="primary"
        >
          <ArrowBack sx={{ fontSize: "1.5rem" }} />
        </IconButton>
        <Typography
          variant="h5"
          color="text.primary"
          fontWeight={600}
          fontSize={"1rem"}
        >
          Back to Categories
        </Typography>
      </Stack>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Category fontSize="large" />
        <Typography variant="h5" fontWeight="bold">
          {isUpdate ? "Edit Product Category" : "Add New Product Category"}
        </Typography>
      </Stack>

      {/* GENERAL + IMAGE */}
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <Typography variant="h6" fontWeight={600}>
            Basic Details
          </Typography>

          <Controller
            name="name"
            control={control}
            rules={{ required: "Category name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Category Name"
                size="medium"
                fullWidth
                sx={{ mt: 2 }}
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
                label="Category Description"
                size="medium"
                fullWidth
                multiline
                rows={3}
                sx={{ mt: 2 }}
              />
            )}
          />

          <Controller
            name="parentCategory"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select Parent Category (Optional)</InputLabel>
                <Select {...field} label="Select Parent Category (Optional)">
                  <MenuItem value="">None</MenuItem>
                  {categories?.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item md={6} sm={12}>
          <Typography variant="h6" fontWeight={600}>
            Category Image (Optional)
          </Typography>
          <Paper
            sx={{
              mt: 2,
              p: 2,
              border: "1px dashed #bbb",
              borderRadius: 2,
              minHeight: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageUpload
              images={images}
              setImages={handleImageUpload}
              deleteImage={deleteImage}
              isMultiple={false}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* VARIANT OPTIONS (ATTRIBUTES) */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Variant Options
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Define fields used later to create product variants. Values remain
              unlimited and product-specific.
            </Typography>
          </Box>
          <Button
            startIcon={<Add />}
            variant="outlined"
            onClick={() => append({ name: "", options: [] })}
          >
            Add Specification
          </Button>
        </Stack>

        {fields.length === 0 ? (
          <Alert severity="info">
            No variant fields added yet. Click “Add Field” to start.
          </Alert>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: 1 }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
                  <TableCell>
                    <b>Name </b>
                  </TableCell>
                  <TableCell>
                    <b>Allowed Values (Product Defines These Later)</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Remove</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fields?.map((attr, index) => (
                  <TableRow
                    key={attr.id}
                    sx={{ "& td": { verticalAlign: "top", paddingTop: 2 } }}
                  >
                    {/* FIELD NAME */}
                    <TableCell width={250}>
                      <Controller
                        name={`attributes.${index}.name`}
                        control={control}
                        rules={{ required: "Specification name is required" }}
                        render={({ field, fieldState }) => {
                          return (
                            <TextField
                              {...field}
                              placeholder="e.g. Size, Color, RAM, Material"
                              size="small"
                              fullWidth
                              sx={{ bgcolor: "rgba(0,0,0,0.01)" }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          );
                        }}
                      />
                    </TableCell>

                    {/* VALUES INPUT + TAGS */}
                    <TableCell>
                      {/* MULTI VALUE INPUT — NO EXTRA SPACE ABOVE */}
                      <Controller
                        name={`attributes.${index}.options`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            placeholder='Add values like: "Red, Blue, 32GB, XL"'
                            size="small"
                            sx={{ width: 280 }}
                            inputRef={field.ref} // 👈 important
                            onKeyDown={(e) => {
                              const target = e.target as HTMLInputElement;
                              if (e.key === "Enter" && target.value.trim()) {
                                e.preventDefault();
                                const value = target.value.trim();
                                if (!value) return;

                                const newOptions = value
                                  ?.split(",")
                                  ?.map((o) => o.trim())
                                  ?.filter(Boolean);
                                const current =
                                  getValues(`attributes.${index}.options`) ||
                                  [];
                                const merged = [
                                  ...new Set([...current, ...newOptions]),
                                ];

                                const fieldName = getValues(
                                  `attributes.${index}.name`,
                                ); // 👈 keep name
                                update(index, {
                                  name: fieldName,
                                  options: merged,
                                }); // 👈 update only options
                                setValue(`attributes.${index}.options`, merged);

                                target.value = "";
                              }
                            }}
                            onBlur={(e) => {
                              const input = e.target as HTMLInputElement;
                              const value = input.value.trim();
                              if (!value) return;

                              const newOptions = value
                                ?.split(",")
                                ?.map((o) => o.trim())
                                ?.filter(Boolean);
                              const current =
                                getValues(`attributes.${index}.options`) || [];
                              const merged = [
                                ...new Set([...current, ...newOptions]),
                              ];

                              const fieldName = getValues(
                                `attributes.${index}.name`,
                              ); // 👈 keep name
                              update(index, {
                                name: fieldName,
                                options: merged,
                              }); // 👈 don't touch name
                              setValue(`attributes.${index}.options`, merged);

                              input.value = "";
                            }}
                          />
                        )}
                      />

                      {/* TAGS ALWAYS AT BOTTOM, LEFT ALIGNED */}
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        sx={{ justifyContent: "flex-start", mt: 1 }}
                      >
                        {(getValues(`attributes.${index}.options`) || [])?.map(
                          (opt) => (
                            <Chip
                              key={opt}
                              label={opt}
                              onDelete={() => {
                                const current =
                                  getValues(`attributes.${index}.options`) ||
                                  [];
                                update(index, {
                                  name: attr.name,
                                  options: current.filter((o) => o !== opt),
                                });
                                setValue(
                                  `attributes.${index}.options`,
                                  current.filter((o) => o !== opt),
                                );
                              }}
                            />
                          ),
                        )}
                      </Stack>
                    </TableCell>

                    {/* DELETE BUTTON */}
                    <TableCell align="center" width={90}>
                      <IconButton
                        onClick={() => setDeleteIndex(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* DELETE CONFIRMATION */}
      <Dialog open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Delete Field?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove the variant field. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIndex(null)}>Cancel</Button>
          <Button onClick={confirmDeleteAttribute} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUBMIT */}
      <Stack direction="row" justifyContent="flex-end">
        <Button type="submit" variant="contained" size="large">
          {isUpdate ? "Update Category" : "Add Category"}
        </Button>
      </Stack>

      {/* NOTIFICATION */}
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={2000}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={notification.isError ? "error" : "success"}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryForm;
