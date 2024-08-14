import React, { useContext, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

import { ApiContext, UserContext } from "pages/_app";
import OAuthLinks from "@components/forms/OAuthLinks";
import { registerUser } from "@lib/actions/auth";
import { loginSchema } from "../../lib/login_schema";

export default function SignUpForm() {
  const router = useRouter();
  const api = useContext(ApiContext);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    try {
      const res = await registerUser(api, values);
      setUser(res.data);

      router.push("/browse?content=discover");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="mt-8">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-3 sm:space-y-6">
          <div className="relative z-0">
            <Field
              id="name"
              name="name"
              type="name"
              autoComplete="new-password"
              placeholder=" "
              required
              className="peer block w-full appearance-none border-0 border-b border-primary-gray bg-transparent py-2.5 px-0 text-sm text-primary-gray focus:border-baby-blue focus:outline-none focus:ring-0"
            />
            <label className="absolute top-3 z-20 peer-placeholder-shown:-z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-primary-gray duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-baby-blue">
              Your Name
            </label>
            <ErrorMessage
              component="a"
              className="text-red-500 text-xs"
              name="name"
            />
          </div>
          <div className="relative z-0">
            <Field
              id="email"
              name="email"
              type="email"
              autoComplete="new-password"
              placeholder=" "
              required
              className="peer block w-full appearance-none border-0 border-b border-primary-gray bg-transparent py-2.5 px-0 text-sm text-primary-gray focus:border-baby-blue focus:outline-none focus:ring-0"
            />
            <label className="absolute top-3 z-20 peer-placeholder-shown:-z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-primary-gray duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-baby-blue">
              Email Address
            </label>
            <ErrorMessage
              component="a"
              className="text-red-500 text-xs"
              name="email"
            />
          </div>
          <div className="relative z-0">
            <Field
              id="password"
              name="password"
              type="password"
              placeholder=" "
              autoComplete="new-password"
              required
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-primary-gray focus:border-baby-blue focus:outline-none focus:ring-0"
            />
            <label className="absolute top-3 z-20 peer-placeholder-shown:-z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-baby-blue">
              Password
            </label>
            <ErrorMessage
              component="a"
              className="text-red-500 text-xs"
              name="password"
            />
          </div>
          {error && (
            <div className="flex items-center my-1.5">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon
                  className="h-4 w-4 text-error-red"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-2">
                <h3 className="text-xs font-medium text-error-red">{error}</h3>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="!mt-10 w-full rounded-md bg-baby-blue p-3 tracking-wider font-semibold leading-6 text-white shadow-sm hover:bg-baby-blue/90"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
      <OAuthLinks />
      <div className="flex justify-center items-center gap-2 mt-6">
        <p>Already have an account?</p>
        <Link
          href="/login"
          className="text-salmon font-semibold hover:cursor-pointer hover:text-rich-salmon"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
