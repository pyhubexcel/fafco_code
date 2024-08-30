import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import { loginSchema } from "../../schema";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { login, resetReducer } from "../../redux/slices/LoginSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSliceData = useSelector((state) => state.LoginSlice.data);
  const loginSliceState = useSelector((state) => state.LoginSlice);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        const payload = {
          username: values.email,
          password: values.password
        }
        dispatch(login(payload));
      },
    });

  useEffect(() => {
    if (loginSliceData.success) {
      toast.success("Login successfull",{autoClose: 2000,});
      // console.log('token', loginSliceData?.data?.access)
      Cookies.set('id', loginSliceData?.data?.id)
      Cookies.set('role', loginSliceData?.data?.customer_type)
      Cookies.set('name', loginSliceData?.data?.name)
      Cookies.set('token', loginSliceData?.data?.access)
      dispatch(resetReducer());

      Navigate('/')
      
    }
    if (loginSliceData?.response?.data?.success === false) {
      toast.error(loginSliceData?.response?.data?.message,{autoClose: 2000,});
      dispatch(resetReducer());
    }
   
  }, [loginSliceData, loginSliceData?.response?.data?.success])


  return (
    <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto my-6 px-4 py-3 rounded-xl space-y-3 shadow-2xl">
     
      <div className="text-blue-500 flex justify-center ">
        <AccountCircleIcon sx={{ fontSize: '130px' }} />
      </div>
      
      <div className="text-3xl text-center text-blue-500 font-semibold ">LOGIN HERE</div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <TextField
            type='email'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name='email'
            className="w-full"
            label='Email'
            size="small"
            required
          />
          {errors.email && touched.email ? (
            <div className="text-red-500 text-[12px] italic">{errors.email}</div>
          ) : null}
        </div>
        <div className="space-y-1">
        <ToastContainer />
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            required={true}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              label="Password"
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password && touched.password ? (
            <div className="text-red-500 text-[12px] italic">{errors.password}</div>
          ) : null}
        </div>
        <div className=" text-blue-600 flex float-right">
          <Link to='/forgetPassword' title="reset password" className="py-2">Forgot Password?</Link>
        </div>
        <div className="text-center">
          <CustomButton
            loading={loginSliceState.isLoading}
            buttonName='Login'
            type="submit"
            variant='contained'
          />
        </div>
      </form>
      <div className=" text-center">
        Don&apos;t have an account?<Link to='/register' title="register" className="text-blue-600" > Create Account</Link>
      </div>
    </div>
  )
}
