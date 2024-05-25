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

type Props = {
  data: Record<string, string>[];
  handleDeleteCategory: (id: string) => void;
};
const Table = (props: Props) => {
  const { data, handleDeleteCategory } = props;
  return (
    <Paper elevation={2} style={{ padding: "1rem" }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((category, index) => {
            return (
              <TableRow key={category?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category?.name}</TableCell>
                <TableCell>{category?.description}</TableCell>
                <TableCell>
                  {
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCategory(category?._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </Paper>
  );
};

export default Table;
