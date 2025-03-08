import { Box, Button, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";

const ProductListHeader = () => {
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
        <strong>Products</strong>
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => navigate("add")}
      >
        Add product
      </Button>
    </Box>
  );
};

export default ProductListHeader;
