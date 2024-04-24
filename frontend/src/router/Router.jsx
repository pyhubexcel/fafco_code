import { Routes, Route, Navigate } from 'react-router-dom';
import cookie from 'react-cookies';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home/Home';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Register';
import InactiveAccount from '../pages/inactiveAccount/InactiveAccount';
import ResetPassword from '../pages/resetPassword/ResetPassword';
import RegisterLink from '../pages/registerLink/RegisterLink';
import HomeownerRegistration from '../pages/homeownerRegistration/HomeownerRegistration';
import RegistrationLookup from '../pages/registrationLookup/RegistrationLookup';
import PagesNotfound from '../pages/404/PagesNotFound';

export default function Router() {
    let token = cookie.load('token');

    return (
        <Routes>
            <Route exact path="/" element={token ? <PrivateRoute><Home /></PrivateRoute> : <Navigate to="/signIn" />}/>
            <Route exact path="/signIn" element={token ? <Navigate to="/" /> : <Login />}/>
            <Route exact path="/signUp" element={token ? <Navigate to="/" /> : <Signup />}/>
            <Route path="/inactiveAccount" element={<InactiveAccount />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/registerLink" element={<RegisterLink />} />
            <Route path="/homeownerRegistration" element={<HomeownerRegistration />} />
            <Route path="/registrationLookup" element={<RegistrationLookup />} />
            <Route path="*" element={<PagesNotfound />} />
        </Routes>
    );
}
