import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import {
  Route,
  Routes,
  SetURLSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import SearchAppBar from "./components/SearchAppBAr/SearchAppBar";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import AuthProvider from "./components/auth/AuthProvider";
import JobDetailModal from "./routes/JodDetailModal";
import RequireAuth from "./components/auth/RequireAuth";
import LoginPageModal from "./routes/LoginPageModal";
import HomePage from "./routes/HomePage";
import { URLSearchParams } from "url";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const ThemeChangeContext = createContext<{
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}>(null!);

export const QueryContext = createContext<{
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}>(null!);

function App() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const state = location.state as { backgroundLocation: Location };
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <AuthProvider>
      <QueryContext.Provider value={{ searchParams, setSearchParams }}>
        <ThemeChangeContext.Provider value={{ isDark, setIsDark }}>
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <SearchAppBar />
            <CssBaseline />
            <Routes location={state?.backgroundLocation || location}>
              <Route path="/" element={<HomePage itemLimit={5} />}>
                {/* <Route path="/" element={<JobPage itemLimit={5} />} /> */}
                {/* <Route
                  path={`:${location.search}`}
                  element={<JobPage itemLimit={5} />}
                /> */}
                {/* <Route
                  path="jobs/page/:page"
                  element={<JobPage itemLimit={5} />}
                />
                <Route
                  path="jobs/search/:q"
                  element={<JobPage itemLimit={5} />}
                />
                <Route
                  path="jobs/search/:q/page/:page"
                  element={<JobPage itemLimit={5} />}
                /> */}
              </Route>
              <Route
                path="*"
                element={
                  <main>
                    <h1>PAGE NOT FOUND</h1>
                  </main>
                }
              />
            </Routes>
            {state?.backgroundLocation && (
              <Routes>
                <Route
                  path="jobs/:jobId"
                  element={
                    <RequireAuth>
                      <JobDetailModal />
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<LoginPageModal />} />
              </Routes>
            )}
          </ThemeProvider>
        </ThemeChangeContext.Provider>
      </QueryContext.Provider>
    </AuthProvider>
  );
}

export default App;
