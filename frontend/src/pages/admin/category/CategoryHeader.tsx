import React from "react";
import { Box, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
const CategoryHeader = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingX={"24"}
      paddingY={"16"}
      width={"100%"}
      flex={1}
    >
      <h1>Categories</h1>
      <Button variant="contained" startIcon={<AddOutlinedIcon />}>
        Add
      </Button>
    </Box>
  );
};

export default CategoryHeader;
