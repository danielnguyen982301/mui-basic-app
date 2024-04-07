import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ThemeMenu from "../ThemeMenu";
import AuthStatus from "../auth/AuthStatus";
import JobFormProvider from "../form/JobFormProvider";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, useTheme } from "@mui/material";
import { QueryContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Search, SearchIconWrapper, StyledInputBase } from "./styled-component";

interface InputValues {
  q: string;
}

export default function SearchAppBar() {
  const { searchParams, setSearchParams } = React.useContext(QueryContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm<InputValues>({ defaultValues: { q: "" } });

  const onSubmit: SubmitHandler<InputValues> = (data) => {
    if (data.q) {
      searchParams.set("q", data.q);
      searchParams.delete("page");
      setSearchParams(searchParams);
    } else {
      setSearchParams({});
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 0,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
          >
            Job Routing
          </Typography>

          <ThemeMenu />

          <JobFormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
            display="flex"
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Controller
                name="q"
                control={methods.control}
                render={({ field }) => (
                  <StyledInputBase
                    {...field}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                )}
              />
            </Search>
            <Button
              sx={{
                bgcolor: theme.palette.mode === "light" ? "grey" : "white",
              }}
              type="submit"
              variant="contained"
            >
              Search
            </Button>
          </JobFormProvider>
          <AuthStatus />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
