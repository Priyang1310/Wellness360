import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@babel/polyfill";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-dh54w48gok42komr.us.auth0.com"
            clientId="HsUFxEfKqDBg2vgcDheGaaanUsfZr3yV"
            authorizationParams={{
                redirect_uri: "http://localhost:5173/login",
            }}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
