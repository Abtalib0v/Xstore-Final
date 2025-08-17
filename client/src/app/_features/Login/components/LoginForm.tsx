"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { ValidationSchema } from "../Validate";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import { QueryKeys } from "@/app/_constant/QueryKeys";
import { postApi } from "@/app/_http/api";
import { Button } from "@/components/ui/button";
const LoginForm = () => {
  const router = useRouter();
const [user, setUser] = useState(null);
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: QueryKeys.login,
    mutationFn: async (data: any) => postApi("/auth/login", data),
  });
  const initalVAlue = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initalVAlue,
    validationSchema: ValidationSchema,
    onSubmit: () => {
      mutate(formik.values, {
        onSuccess: (data) => {
          setCookie("token", data.token, {
            maxAge: 60 * 60 * 24 * 7,
          });
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
        //   router.push("/admin");
        window.location.reload();
          formik.resetForm();
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      });
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className=" w-full">
        {isError ? (
          <div className="bg-red-100 text-red-500 p-2 rounded-md mb-4">
            <p className="text-sm">{error.message}</p>
          </div>
        ) : null}
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          id="loginForm"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              id="email"
              className="mt-1 outline-none py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched && formik.errors.email ? (
              <div>
                <span className="text-red-400 text-sm">
                  {formik.errors.email}
                </span>
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              id="password"
              className="mt-1 block w-full outline-none py-2 px-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched && formik.errors.password ? (
              <div>
                <span className="text-red-400 text-sm">
                  {formik.errors.password}
                </span>
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full outline-none flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isPending ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
