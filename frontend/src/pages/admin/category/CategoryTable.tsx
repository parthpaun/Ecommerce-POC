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
import { useCallback, useMemo } from "react";

type Category = {
  _id: string;
  name: string;
  parentCategory?: {
    name: string;
  };
  description: string;
};

type Props = {
  data: Category[];
  handleDeleteCategory: (id: string) => void;
};
const Table = (props: Props) => {
  const { data, handleDeleteCategory } = props;

  const memoizedHandleDelete = useCallback(
    (id: string) => {
      handleDeleteCategory(id);
    },
    [handleDeleteCategory]
  );

  const paperStyle = useMemo(() => ({ padding: "1rem" }), []);

  const memoizedTableBody = useMemo(() => (
    <TableBody>
      {data?.map((category, index) => (
        <TableRow key={category?._id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{category?.name}</TableCell>
          <TableCell>{category?.parentCategory?.name}</TableCell>
          <TableCell>{category?.description}</TableCell>
          <TableCell>
            <IconButton
              color="error"
              onClick={() => memoizedHandleDelete(category?._id)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  ), [data, memoizedHandleDelete]);

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
