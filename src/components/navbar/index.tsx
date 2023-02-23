import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import logo from "../../media/spiderman.png";
import { Container } from "../index";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useSearchGetData } from "../../hooks";
import * as CONSTANTS from "../../utility/constants";

const pages = ["Characters", "Comics", "Events", "Series"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [enteredKey, setEnteredKey] = React.useState<string>("");
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const pathName = location.pathname.slice(1);

  const charReduxData = useSearchGetData(pathName, enteredKey);

  return (
    <>
      <AppBar position="sticky" sx={{ background: "rgb(18, 18, 18)" }}>
        <Container
          sx={{
            maxWidth: { sm: "sm", md: "md", lg: "lg", xl: "xl" },
          }}
        >
          <Grid>
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {/* mobile */}
                  {pages.map((page) => (
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={`${page.toLowerCase()}`}
                      key={page}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography component={Link} to="/">
                <img
                  src={logo}
                  alt="bug"
                  height={40}
                  style={{ filter: "invert(1)" }}
                />
              </Typography>
              <Box
                sx={{ ml: 2, flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                {/* web */}
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontWeight: "bold",
                    }}
                    component={Link}
                    to={page.toLowerCase()}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="TBD..."
                  inputProps={{ "aria-label": "search" }}
                  value={enteredKey}
                  onChange={(e: any) => {
                    setEnteredKey(e?.target?.value);
                    charReduxData();
                  }}
                />
              </Search>
            </Toolbar>
          </Grid>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Navbar;
