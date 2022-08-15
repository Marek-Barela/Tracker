import { Toolbar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector, useAppDispatch } from "hooks/useRedux";
import { setMenuOpen } from "redux/slices/openMenu";

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

const MenuBar = () => {
  const isMenuOpen = useAppSelector((state) => state.openMenu);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(setMenuOpen(true));
  };

  return (
    <AppBar position="fixed" open={isMenuOpen} elevation={0} variant="outlined" color="inherit" sx={{ height: 65 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(isMenuOpen && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
