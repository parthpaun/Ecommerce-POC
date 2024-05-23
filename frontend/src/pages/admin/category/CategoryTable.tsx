import {
  Paper,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

type Props = {
  data: Record<string, string>[];
};
const Table = (props: Props) => {
  const { data } = props;
  return (
    <Paper elevation={2} style={{ padding: "1rem" }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((category, index) => {
            return (
              <TableRow key={category?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category?.name}</TableCell>
                <TableCell>{category?.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
      {/* <table>
        <tr>
          <th>sr.no</th>
          <th>Category</th>
          <th>description</th>
        </tr>
        {data.map((category, index) => {
          return (
            <tr key={category?._id}>
              <td>{index + 1}</td>
              <td>{category?.name}</td>
              <td>{category?.description}</td>
            </tr>
          );
        })}
      </table> */}
    </Paper>
  );
};

export default Table;
