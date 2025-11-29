import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "../components/Signup";
import Login from "../components/Login";
import Home from "../components/Home";
import ComposeMail from "../components/ComposeMail";
import Inbox from "../components/Inbox";
import MailDetails from "../components/MailDetails";

const AppRoutes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/compose",
      element: <ComposeMail />,
    },
    {
      path: "/inbox",
      element: <Inbox />,
    },
    {
      path: "/mail/:id",
      element: <MailDetails />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default AppRoutes;
