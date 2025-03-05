import { Box, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";

// type Payload = {
//   handleAddUpdateProduct: (
//     isOpen: boolean,
//     mode?: string,
//     data?: Record<string, string>
//   ) => void;
// };
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
      flex={1}
    >
      <h1>Products</h1>
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
