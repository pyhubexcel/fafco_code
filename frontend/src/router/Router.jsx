import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from '../pages/Home/Home';
import Login from '../pages/login/Login';
import InactiveAccount from '../pages/inactiveAccount/InactiveAccount';
import ResetPassword from '../pages/resetPassword/ResetPassword';
import RegisterLink from '../pages/registerLink/RegisterLink';
import RegistrationLookup from '../pages/registrationLookup/RegistrationLookup';
import NewPassword from '../pages/newPassword/NewPassword';
import AddressValidation from '../pages/AddressValidation/AddressValidation';
import ViewRegistration from '../pages/homeownerRegistration/HomeownerRegistration';
import Register from '../pages/Register/Register';
import PageNotfound from '../pages/pageNotFound/PagesNotFound';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreateRegistration from '../pages/createRegistration/CreateRegistration';
import UpdateAccountInfo from '../pages/updateAccountInfo/UpdateAccountInfo';
import ProfileScreen from '../pages/Profile/Profile';

export default function Router() {
  let token = Cookies.get('token');
  const Navigation = useNavigate();
  const location = useLocation();
  const urlPath = location.pathname;
  const loginSliceData = useSelector((state) => state.LoginSlice.data);
  const logoOutState = useSelector((state) => state.logOutSlice);

  useEffect(() => {
    token = Cookies.get('token');
    if (token && (urlPath == "/login" || urlPath == "/register")) {
      Navigation('/')
    }
  }, [loginSliceData, logoOutState])

  return (
    <Routes>
      <Route exact path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route exact path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<ProfileScreen />} />
      <Route path="/inactiveAccount" element={token ? <Navigate to="/" /> : <InactiveAccount />} />
      <Route path="/forgetPassword" element={token ? <Navigate to="/" /> : <ResetPassword />} />
      <Route path="/registerLink" element={token ? <Navigate to="/" /> : <RegisterLink />} />
      <Route path="/newPassword/:email" element={token ? <Navigate to="/" /> : <NewPassword />} />
      <Route path="/viewRegistration/:id" element={token ? <ViewRegistration /> : <Navigate to="/login" />} />
      <Route path="/registrationLookup" element={token ? <RegistrationLookup /> : <Navigate to="/login" />} />
      <Route path="/addressValidation" element={token ? <AddressValidation /> : <Navigate to="/login" />} />
      <Route path="*" element={<PageNotfound />} />
      <Route path="/CreateRegistration" element={token ? <CreateRegistration /> : <Navigate to="/" />} />
      <Route path="/updateInfo" element={token ? <UpdateAccountInfo /> : <Navigate to="/" />} />
    </Routes>
  );
}