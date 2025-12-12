import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Rootlayout from "./LayOuts/Rootlayout";

export const router = createBrowserRouter([
    {
        path: '/',
        index: true,
        Component: Rootlayout,
    }
])