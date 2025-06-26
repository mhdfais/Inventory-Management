import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { loggedIn } from "@/redux/authSlice";
import { login } from "@/services/authService";
import type { loginFormValues } from "@/types/types";
import {
  loginInitialValues,
  loginSchema,
} from "@/utils/validations/loginValidator";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Package } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: loginFormValues) => {
    try {
      await login(values);
      dispatch(loggedIn());
      toast.success("login successfull");
      navigate('/inventory')
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Package className="h-12 w-12 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your email"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "logging in" : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
