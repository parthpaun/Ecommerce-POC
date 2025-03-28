import { Box, Button, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import React from "react";

const CategoryHeader = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingX={"24"}
      paddingY={"16"}
      width={"100%"}
      marginBottom={"15px"}
    >
      <Typography variant="h4">
        <strong>Category</strong>
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => navigate("/admin/categories/add")}
        color="secondary"
      >
        Add Category
      </Button>
    </Box>
  );
};

export default React.memo(CategoryHeader);
