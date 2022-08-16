import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useAppSelector } from "hooks/useRedux";
import { NavbarHistory, MenuBar } from "components";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";

const drawerWidth = 280;

const Main = styled("main")<{
  open?: boolean;
  isMobile: boolean;
}>(({ theme, open, isMobile }) => ({
  marginTop: "64px",
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? "0px" : `-${drawerWidth}px`,
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
  const [isMobile, setIsMobile] = useState(false);
  const isMenuOpen = useAppSelector((state) => state.openMenu);
  const { width } = useWindowSize();
  const theme = useTheme();

  useEffect(() => {
    theme.breakpoints.values.md > width ? setIsMobile(true) : setIsMobile(false);
  }, [width]);

  return (
    <Box sx={{ display: "flex" }}>
      <MenuBar />
      <NavbarHistory isMobile={isMobile} />
      <Main open={isMenuOpen} isMobile={isMobile}>
        {children}
      </Main>
    </Box>
  );
};

export default AppShell;
