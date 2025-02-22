import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { Provider } from "react-redux";
import store from "./store/store.ts";
createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
    </Provider>
);
