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
import { useRouter } from 'next/navigation';

async function signinUser({ email, password }) {
  try {
    const response = await axios.post("/api/signin", {
      email: email,
      password: password,
    });
    // console.log(response.data); // Handle the response data here
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
    // Handle the error response here
  }
}

export function SignIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or Username is required"),
    password: Yup.string().required("Password is required"),
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

      const res = await signinUser(formData);

      if (res.status === 200) {
        // save res.message to localStorage
        console.log(res);
        // localStorage.setItem("token", res.data.message);
        setIsSuccessAlertVisible(true);
        setTimeout(() => {
          router.push("/");
          setIsSuccessAlertVisible(false);
        }, 2000);
        setErrorText("");
        reset();
      }
    } catch (error) {
      
      setErrorText(error.message);
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
            Successfully signed in. Redirecting to dashboard...
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
          <CardTitle>SignIn</CardTitle>
          <CardDescription>
            Please enter your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} >
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email "
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            <p>{errors.password?.message}</p>
          </div>
        </CardContent>
        <CardFooter>
        <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
}
