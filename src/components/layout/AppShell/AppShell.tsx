import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useAppSelector } from "hooks/useRedux";
import { NavbarHistory, MenuBar } from "components";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppShellProps {
  children: JSX.Element | JSX.Element[];
}

const AppShell = ({ children }: AppShellProps) => {
  const isMenuOpen = useAppSelector((state) => state.openMenu);

  return (
    <Box sx={{ display: "flex" }}>
      <MenuBar />
      <NavbarHistory />
      <Main open={isMenuOpen}>{children}</Main>
    </Box>
  );
};

export default AppShell;
