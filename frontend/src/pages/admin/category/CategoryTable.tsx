import {
  Paper,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useMemo } from "react";

type CategoryData = {
  name: string;
  description: string;
  _id: string;
  attributes: Record<string, string>[];
  parentCategory?: { _id: string; name: string };
  image?: {
    name?: string | null;
    url?: string | null;
    key?: string | null;
  } | null;
};

type Props = {
  data: CategoryData[];
  handleDeleteCategory: (id: string) => void;
  handleUpdateCategory: (id: string) => void;
};
const Table = (props: Props) => {
  const { data, handleDeleteCategory, handleUpdateCategory } = props;

  const paperStyle = useMemo(() => ({ padding: "1rem" }), []);

  const memoizedTableBody = useMemo(
    () => (
      <TableBody>
        {data?.map((category, index) => (
          <TableRow key={category?._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{category?.name}</TableCell>
            <TableCell>{category?.parentCategory?.name}</TableCell>
            <TableCell>{category?.description}</TableCell>
            <TableCell>
              <IconButton
                color="primary"
                onClick={() => handleUpdateCategory(category?._id)}
              >
                <BorderColorIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteCategory(category?._id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    ),
    [data, handleUpdateCategory, handleDeleteCategory],
  );

  return (
    <Paper elevation={2} style={paperStyle}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Parent category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        {memoizedTableBody}
      </MuiTable>
    </Paper>
  );
};

export default Table;
