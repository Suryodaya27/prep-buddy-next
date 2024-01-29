"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function signupUser({ email, password}) {
  try {
    const response = await axios.post("/api/signup", {
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const res = await signupUser(formData);
      //   console.log(res);
      if (res.status === 201) {
        setIsSuccessAlertVisible(true);
        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 6000);
        setErrorText("");
        reset();
      }
    } catch (error) {
      console.log(error);
      setErrorText("Signup failed: " + error.message);
      setTimeout(() => {
        setErrorText("");
      }, 6000);
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isSuccessAlertVisible && (
        <Alert status="success" className="my-5">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Signup successful! Please sign in.
          </AlertDescription>
        </Alert>
      )}
      {errorText && (
        <Alert status="error" className="my-5">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorText}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            Create your account here. Click create account when you are done.    
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" {...register("email")} placeholder="Email" />
              <p className="text-xs text-gray-800">{errors.email?.message}</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input
                id="new"
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              <p className="text-xs text-gray-800">{errors.password?.message}</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm password"
              />
              <p className="text-xs text-gray-800">{errors.confirmPassword?.message}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
