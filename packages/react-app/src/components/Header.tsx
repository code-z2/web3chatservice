import { Box, AppBar, Toolbar, Avatar } from "@mui/material"
import PolygonLogo from "./images/polygon.svg"
import Logo from "./images/logo2.png"

const Header = () => {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: "#397474",
          padding: 1,
          boxShadow: "none",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{ width: 65, position: "absolute" }}
        />
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 0,
          }}
        >
          <Avatar alt="polygon logo" src={PolygonLogo} sx={{ width: 35, height: 35, p: 1, background: "#1D5050" }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
