import { Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
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
import CreateClaim from '../pages/claim/CreateClaim';

export default function Router() {
    let token = cookie.load('token');
    const Navigation = useNavigate();
    const location = useLocation();
    const urlPath  = location.pathname;
    const customSliceSuccess = useSelector((state) => state.CustomSlice.isSuccess);
    const logoutSuccess = useSelector((state)=>state.CustomSlice.data);
    useEffect(()=>{
        token = cookie.load('token');
        if(token && (urlPath == "/login" || urlPath == "/register")){
            Navigation('/')
        }
        console.log("testing routes ")
    },[customSliceSuccess,logoutSuccess])

    return (
        <Routes>
            <Route exact path="/" element={token ?<Home /> : <Navigate to="/login" />} />
            <Route exact path="/login" element={token ? <Navigate to="/" /> : <Login />} />
            <Route exact path="/register" element={token ? <Navigate to="/" /> : <Register />} />
            <Route path="/inactiveAccount" element={ token ?  <Navigate to="/" /> : <InactiveAccount /> } />
            <Route path="/forgetPassword" element={token ?  <Navigate to="/" /> :  <ResetPassword /> } />
            <Route path="/registerLink" element={ token ?  <Navigate to="/" /> : <RegisterLink />} />
            <Route path="/newPassword" element={ token ? <Navigate to="/" /> :  <NewPassword />  }/>
            <Route path="/viewRegistration" element={ token ?  <ViewRegistration /> :  <Navigate to="/" />}/>
            <Route path="/registrationLookup" element={ token ? <RegistrationLookup /> :  <Navigate to="/" />}/>
            <Route path="/addressValidation" element={ token ?  <AddressValidation /> :  <Navigate to="/" />}/>
            <Route path="*" element={ <PageNotfound /> }/>
            <Route path="/createClaim" element={ <CreateClaim /> }/>
        </Routes>
    );
}