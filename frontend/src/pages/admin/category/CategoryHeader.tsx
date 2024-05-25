import { Box, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

type Payload = {
  handleAddUpdateCategory: (
    isOpen: boolean,
    mode?: string,
    data?: Record<string, string>
  ) => void;
};
const CategoryHeader = ({ handleAddUpdateCategory }: Payload) => {
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
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => handleAddUpdateCategory(true, "add")}
      >
        Add
      </Button>
    </Box>
  );
};

export default CategoryHeader;
