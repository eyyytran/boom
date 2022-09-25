import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider
    store={store}
    children={
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    }
  />
  // </React.StrictMode>,
);
