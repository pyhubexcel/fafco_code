import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name: Yup.string().trim().min(2).max(25).required("Please enter your name"),
    phone: Yup.string().trim().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Please enter your phone number"),
    email: Yup.string().trim().email("Please enter a valid email").required("Please enter your email"),
    confirmEmail: Yup.string().trim().email("Please enter a valid email").oneOf([Yup.ref('email'), null], "Emails must match").required("Please confirm your email"),
    password: Yup.string().trim().min(4).required('Please enter your password'),
    confirmPassword: Yup.string().trim().oneOf([Yup.ref('password'), null], "Passwords must match").required('Please confirm your password'),
    roll: Yup.string().trim(),
});

export const loginSchema = Yup.object({
    email: Yup.string().trim().email("Please enter a valid email").required("Please enter your email"),
    password: Yup.string().trim().min(4).required('Please enter your password'),
});
