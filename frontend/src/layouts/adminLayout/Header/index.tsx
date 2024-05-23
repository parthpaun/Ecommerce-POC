import { Box, IconButton, Toolbar, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type HeaderProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Header = ({ open, handleDrawerOpen }: HeaderProps) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" justifyContent={"flex-end"} width={"100%"}>
          Header
        </Box>
        {/* <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;