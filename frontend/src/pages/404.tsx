import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoud() {
  return (
    <Box display={"flex"} flexDirection="column" alignItems="center">
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <img src="/404.svg" alt="404 Not Found" width={"50%"} height={"100%"} />
      </Box>
      <Box display={"flex"} margin="25px">
        <Button variant="contained" color="primary">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Back to home
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
