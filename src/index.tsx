import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Routes>
          <Route element={<App />}>
            <Route element={<JobPageContainer />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/jobs/page/:page"
                element={<JobPage itemLimit={5} />}
              />
            </Route>
          </Route>
        </Routes> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
