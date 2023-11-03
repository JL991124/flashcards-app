import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/", {});
  };

  return (
    <Container maxWidth="lg" style={{ margin: "auto" }}>
      <AppBar
        position="static"
        style={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              component="a"
              onClick={handleClickHome}
              sx={{
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              FlashCard
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Container>
  );
};
export default NavBar;
