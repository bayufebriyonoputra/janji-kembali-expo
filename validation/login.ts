import * as yup from "yup";

export const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 charactes").required("password is required")
});

export type signInValues = yup.InferType<typeof signInSchema>;