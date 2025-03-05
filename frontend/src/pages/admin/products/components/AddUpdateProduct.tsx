import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addProduct } from "../../../../redux/admin/product/productAction";
import { useAppDispatch } from "../../../../redux/hooks";
import FileUpload from "./FileUpload";

type Props = {
  open: boolean;
  mode?: string;
  data?: Record<string, unknown>;
  handleAddUpdateProduct: (open: boolean) => void;
};

const AddUpdateProduct = (props: Props) => {
  const { open, mode, data, handleAddUpdateProduct } = props;
  const dispatch = useAppDispatch();
  const handleClose = () => {
    handleAddUpdateProduct(false);
  };

  const { control, handleSubmit, formState, reset, setValue } =
    useForm<ProductInputs>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<ProductInputs> = (data) => {
    dispatch(addProduct(data));
    handleClose();
    reset();
  };

  React.useEffect(() => {
    //handle update product scenario
  }, [data]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{`${mode} product`.toLocaleUpperCase()}</DialogTitle>
      {/* <ProductForm handleSubmit={handleSubmit} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="flex">
            <Controller
              control={control}
              name="name"
              rules={{ required: "Product is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Title"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ""}
                  fullWidth
                  margin={"dense"}
                />
              )}
            />
            <div>
              <FileUpload  setValue={setValue}/>
            </div>
          </div>
          {/* <Controller
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
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUpdateProduct;
