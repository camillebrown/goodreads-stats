import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import OAuthLinks from "./OAuthLinks";
import { ApiContext, UserContext } from "@/pages/_app";
import { loginSchema } from "../../lib/login_schema";
import { loginUser } from "@/actions/users";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const api = useContext(ApiContext);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    loginUser(api, values)
      .then((res) => {
        setUser(res.data);
        router.push("/browse?content=discover");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="mt-6 sm:mt-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-3 sm:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="new-password"
                placeholder="Email"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                component="a"
                className="text-red-500 text-xs"
                name="email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6"
              />
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
                  <h3 className="text-xs font-medium text-error-red">
                    {error}
                  </h3>
                </div>
              </div>
            )}
          </div>

          {/* TODO!!! what happens here!! */}
          <div className="flex justify-end">
            <div className="text-sm leading-6">
              <a
                href="#"
                className="font-semibold text-sage hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sage px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green"
            >
              Sign in
            </button>
          </div>
        </Form>
      </Formik>

      {/* <OAuthLinks />
        TODO: Add Google Oauth Link!!!
      */}
    </div>
  );
}
