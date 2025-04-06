import * as yup from "yup";

export const signUpSchema = yup.object().shape({
    fullname: yup.string().required("Fullname is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 charactes").required("password is required")
});

export type signUpFormData = yup.InferType<typeof signUpSchema>;