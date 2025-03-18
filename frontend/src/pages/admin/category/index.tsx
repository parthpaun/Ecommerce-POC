import { FC, useEffect, memo, useState } from "react";
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getCategories,
  deleteCategory as deleteCategoryAction,
} from "../../../redux/admin/category/categoryAction";
import CategoryHeader from "./CategoryHeader";
import CategoryTable from "./CategoryTable";
import ConfirmationPopup from "../../../components/ConfirmationPopup";

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState({
    open: false,
    id: "",
  });
  useState<CategoryAddUpdateState>({
    open: false,
    mode: "",
    data: {},
  });
  const categoryState = useAppSelector((state) => state?.adminCategory);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const handleDeleteCategory = (id: string) => {
    setDeleteCategoryOpen({ open: true, id: id });
  };

  const deleteCategory = () => {
    dispatch(deleteCategoryAction(deleteCategoryOpen.id));
    setDeleteCategoryOpen({ open: false, id: "" });
  };

  return (
    <Container component="main" maxWidth="xl" className="categories">
      <CategoryHeader />
      <CategoryTable
        data={categoryState?.categories}
        handleDeleteCategory={handleDeleteCategory}
      />
      <ConfirmationPopup
        open={deleteCategoryOpen.open}
        setOpen={(open) => setDeleteCategoryOpen({ open: open, id: "" })}
        message="Are you sure You want to delete this category"
        handleConfirm={deleteCategory}
        title="Delete category"
      />
    </Container>
  );
};
const MemoCategory = memo(Categories);
export default MemoCategory;
