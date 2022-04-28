import React from "react";
import Homepage from "./components/Homepage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import RepoPage from "./components/RepoPage";
import SearchResults from "./components/SearchResults";
// import { ReactQueryDevtools } from "react-query/devtools";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Homepage />}>
                <Route index element={<SearchResults />} />
                <Route
                  path="repository/:owner/:repoName"
                  element={<RepoPage />}
                />
              </Route>
              <Route
                path="*"
                element={
                  <div className={"empty-route"}>
                    <div>Nothing to see here</div>
                    <div>¯\_(ツ)_/¯</div>
                  </div>
                }
              />
            </Routes>
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
          </HashRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
