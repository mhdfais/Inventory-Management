import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  registerInitialValues,
  registerSchema,
} from "@/utils/validations/regsiterValidator";
import type { registerFormValues } from "@/types/types";
import { registerUser } from "@/services/authService";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: registerFormValues) => {
    try {
      await registerUser(values);
      toast.success("Registered successfully, Please Login now");
      navigate('/login')
    } catch (error) {
      toast.error("Failed to register");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Package className="h-12 w-12 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create your account to start managing inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={registerInitialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                     className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                     className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                     className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
