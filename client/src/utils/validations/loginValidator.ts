import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("invalid email")
    .required("email is required"),
  password: yup
    .string()
    .trim()
    .min(4, "min 4 charaters required")
    .required("password is required"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};
