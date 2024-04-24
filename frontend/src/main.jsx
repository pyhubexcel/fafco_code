import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'devextreme/dist/css/dx.light.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login.jsx';
import Signup from "./pages/signup/Register.jsx"
import InactiveAccount from './pages/inactiveAccount/InactiveAccount.jsx';
import ResetPassword from './pages/resetPassword/ResetPassword.jsx';
import RegisterLink from './pages/registerLink/RegisterLink.jsx';
import RegistrationLookup from './pages/registrationLookup/RegistrationLookup.jsx';
import Home from './pages/Home/Home.jsx';
import cookie from 'react-cookies'
import HomeownerRegistration from './pages/homeownerRegistration/HomeownerRegistration.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/inactiveAccount",
        element: <InactiveAccount />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/registerLink",
        element: <RegisterLink />,
      },
      {
        path: "/registrationLookup",
        element: <RegistrationLookup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/homeownerRegistration",
        element: <HomeownerRegistration />,
      },
    ]
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: <Login />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
