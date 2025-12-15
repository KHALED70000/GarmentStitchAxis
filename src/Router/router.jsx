import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Rootlayout from "./LayOuts/Rootlayout";
import Error404 from "../Pages/ErrorPages/Error404";
import Home from "../Pages/Home/Home";
import AllProduct from "../Pages/AllProduct/AllProduct";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import DashBoardLayout from "./LayOuts/DashBoard/DashBoardLayout";
import AdminDashboardHome from "./LayOuts/DashBoard/AdminDashboardHome";
import SignUp from "./LayOuts/Authlayouts/SignUp";
import LogIn from "./LayOuts/Authlayouts/Login";
import Authlayouts from "./LayOuts/Authlayouts/Authlayouts";
import PrivateRoutes from "./PRIVETROUT/PrivateRoutes";
import DashboardHome from "./LayOuts/DashBoard/DashboardHome";
import User from "./LayOuts/DashBoard/User";
import AddProduct from "./LayOuts/DashBoard/AddProduct";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Rootlayout />,
        errorElement: <Error404 />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },
            {
                path: '/All-Product',
                element: <AllProduct />
            },
            {
                path: '/AboutUs',
                element: <AboutUs />
            },
            {
                path: '/Contact',
                element: <Contact />,
            },
            {
                path: '/ViewDetails/:id',
                element:<PrivateRoutes> <ViewDetails/> </PrivateRoutes>,
            },
            {
                path: "*",
                element: <Error404 />
            }
        ]
    },
    {
        path: '/',
        Component: Authlayouts,
        children: [
            {
                path: 'login',
                Component: LogIn,
            },
            {
                path: 'SignUp',
                Component: SignUp,
            }
        ]
    },
    {
        path: '/Dashboard',
        element: <PrivateRoutes><DashBoardLayout /></PrivateRoutes>,
        children: [
            {
                index: true,
                path: 'DashBoard-Home',
                element: <DashboardHome />,
            },
            {
                path: 'Users',
                element: <User/>,
            },
            {
                path: 'Add-Product',
                element: <AddProduct/>
            },
        ],
    }
])