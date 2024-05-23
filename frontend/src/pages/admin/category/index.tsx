import { FC, useEffect, memo } from "react";
import { Box, Button, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCategories } from "../../../redux/admin/category/categoryAction";
import CategoryHeader from "./CategoryHeader";
import CategoryTable from "./CategoryTable";

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((state) => state?.adminCategory);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <Container component="main" maxWidth="xl" className="categories">
      <CategoryHeader />
      <CategoryTable data={categoryState?.categories} />
    </Container>
  );
};
const MemoCategory = memo(Categories);
export default MemoCategory;
