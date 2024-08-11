import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import bg1 from "../styles/bg.svg";

export default function Login() {
  return (
    <div className="font-raleway w-full min-h-screen h-screen flex items-center justify-center">
      <div className="w-2/5 h-full flex flex-col justify-center text-primary-gray tracking-wider py-24 px-16">
        <h2 className="text-5xl font-bold text-secondary-baby-blue">Welcome Back!</h2>
        <p className="text-2xl my-2">Please log in to your account.</p>
        <LoginForm />
      </div>

      <div className="relative hidden w-full h-full flex-1 lg:flex flex-col items-center justify-center">
        <Image
          src={bg1}
          alt="Background Image"
          className="w-full h-full object-cover object-left"
          priority
        />
      </div>
    </div>
  );
}
