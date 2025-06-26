import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim().min(3, "too short").required("name is required"),
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
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "passwords does not match")
    .required("confirm password is required"),
});

export const registerInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
