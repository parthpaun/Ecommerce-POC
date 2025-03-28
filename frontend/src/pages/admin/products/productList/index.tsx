import { FC, useEffect, memo, useState, useMemo, useCallback } from "react";
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getProducts,
  deleteProduct as deleteProductAction,
} from "../../../../redux/admin/product/productAction";
import ProductHeader from "./ProductListHeader";
import ProductTable from "./ProductTable";
import ConfirmationPopup from "../../../../components/ConfirmationPopup";

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const [deleteProductOpen, setDeleteProductOpen] = useState({
    open: false,
    id: "",
  });
  useState<ProductAddUpdateState>({
    open: false,
    mode: "",
    data: {},
  });

  const productState = useAppSelector((state) => state?.adminProduct);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = useCallback((id: string) => {
    setDeleteProductOpen({ open: true, id });
  }, []);

  const deleteProduct = useCallback(() => {
    dispatch(deleteProductAction(deleteProductOpen.id));
    setDeleteProductOpen({ open: false, id: "" });
  }, [dispatch, deleteProductOpen.id]);

  const handleSetOpen = useCallback((open: boolean) => {
    setDeleteProductOpen({ open, id: "" });
  }, []);

  return (
    <Container component="main" maxWidth="xl" className="categories">
      {useMemo(() => <ProductHeader />, [])}
      <ProductTable
        data={productState?.products}
        handleDeleteProduct={handleDeleteProduct}
      />
      <ConfirmationPopup
        open={deleteProductOpen.open}
        setOpen={handleSetOpen}
        message="Are you sure You want to delete this category"
        handleConfirm={deleteProduct}
        title="Delete category"
      />
    </Container>
  );
};
const MemoProducts = memo(Products);
export default MemoProducts;
