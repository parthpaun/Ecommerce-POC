import { Box, Button, Typography } from "@mui/material";
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
      marginBottom={"15px"}
    >
      <Typography variant="h4">
        <strong>Category</strong>
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => handleAddUpdateCategory(true, "add")}
      >
        Add Category
      </Button>
    </Box>
  );
};

export default CategoryHeader;
