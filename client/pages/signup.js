import SignUpForm from "@components/forms/SignUpForm";
import bg1 from "../styles/bg.svg";

export default function SignUp() {
  return (
    <div className="font-raleway w-full min-h-screen h-screen flex items-center justify-center bg-no-repeat bg-cover bg-login-bg lg:bg-auto object-fill bg-right lg:object-none">
      <div className="w-3/4 lg:w-2/5 lg:h-full flex flex-col justify-center text-primary-gray tracking-wider py-20 lg:py-24 px-16 bg-white lg:bg-none rounded-lg lg:rounded-none shadow-xl lg:shadow-none">
        <h2 className="text-xl font-semibold text-baby-blue">Welcome to</h2>
        <h2 className="text-5xl font-bold text-baby-blue mb-4">Goodreader!</h2>
        <p className="text-xl">Create an account below to get started.</p>
        <SignUpForm />
      </div>

      <div className="relative hidden w-full h-full flex-1 lg:flex flex-col items-center justify-center">
        <img
          src={bg1}
          alt="Background Image"
          className="w-full h-full object-cover object-left"
          priority="true"
        />
      </div>
    </div>
  );
}
