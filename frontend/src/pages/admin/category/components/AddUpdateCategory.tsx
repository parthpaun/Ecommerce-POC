import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addCategory } from "../../../../redux/admin/category/categoryAction";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  open: boolean;
  mode?: string;
  data?: Record<string, unknown>;
  handleAddUpdateCategory: (open: boolean) => void;
};
interface CategoryInputs {
  name: string;
  parentCategory?: string;
  description?: string;
}
const AddUpdateCategory = (props: Props) => {
  const { open, mode, data, handleAddUpdateCategory } = props;
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state?.adminCategory
  )?.categories;
  const handleClose = () => {
    handleAddUpdateCategory(false);
  };

  const { control, handleSubmit, formState, reset } = useForm<CategoryInputs>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<CategoryInputs> = (data) => {
    dispatch(addCategory(data));
    handleClose();
    reset();
  };

  React.useEffect(() => {
    //handle update category scenario
  }, [data]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{`${mode} category`.toLocaleUpperCase()}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : ""}
                fullWidth
                margin={"dense"}
              />
            )}
          />
          <Controller
            control={control}
            name="parentCategory"
            render={({ field }) => (
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel>Parent Category</InputLabel>
                <Select
                  {...field}
                  label="Parent Category"
                  defaultValue=""
                  fullWidth
                  variant="outlined"
                  margin={"dense"}
                  placeholder="Parent"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => {
                    return (
                      <MenuItem value={category._id}>{category?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                error={!!errors.description}
                margin={"dense"}
                fullWidth
                multiline
                rows={2}
                maxRows={4}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" >Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUpdateCategory;
