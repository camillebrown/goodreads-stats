import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import home from "../styles/home-bg.png";

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 bg-light-gray lg:pl-20 font-raleway">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white shadow-lg">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-2 sm:mt-8 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:flex flex-col items-center justify-center px-4">
        <Image src={home} alt="Guy sitting on couch" className="w-3/5" />
      </div>
    </div>
  );
}
