import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signin from "../assets/images/signin_img.png";
import { auth } from "../services/FirebaseConfig";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // Animations
  const leftVariant = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  const rightVariant = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  const handleLogin = async (event) => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userName = user.displayName;
      navigate("/", { state: { name: userName } });
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-credential") {
        setErrorMessage(
          "Enterd email or password is wrong! Please check the credentials."
        );
      } else if (errorCode === "auth/user-not-found") {
        setErrorMessage(
          "No account found with this email. Please sign up first."
        );
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      } else {
        console.error("Login error:", error.message);
        setErrorMessage(
          "An error occurred during login. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigate("/");
      }
    });
  });

  return (
    <>
      <div className="bg-[#F7F5F4] min-h-screen flex flex-col md:flex-row pb-8 px-7 justify-center md:gap-20 items-center">
        <motion.div
          className="task-vector-img w-80 md:w-md"
          variants={leftVariant}
          initial="hidden"
          animate="visible"
        >
          <img src={signin} alt="task-vector-img" />
        </motion.div>

        {/* Sign In Section */}
        <motion.div
          className="signin flex flex-col items-center gap-9 w-md"
          variants={rightVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center gap-2.5">
            <h1 className="text-[#231C16] font-bold text-3xl">PlannIt</h1>
            <p className="text-[#231C16] text-lg font-medium">
              Sign in to your account
            </p>
          </div>

          {/* Sign In Forms */}
          <div className="w-full mt-5 flex flex-col items-center gap-6 bg-white py-14 rounded-2xl">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-2 w-3/4 py-1.5 px-2 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-2 w-3/4 py-1.5 px-2 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
            />
            <div className="w-3/4 text-right">
              <p className="text-[#231C16] inline-block w-fit cursor-pointer hover:text-[#2FE6CC] transition-all duration-300 font-small text-sm underline">
                <Link to={"/forgot_password"}>Forgot Password</Link>
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="bg-[#2FE6CC] w-2/4 cursor-pointer font-bold hover:text-[#2FE6CC] hover:bg-transparent hover:outline-[#2FE6CC] py-2 px-7 rounded-2xl outline-2 transition-all duration-500"
            >
              Sign In
            </button>
            {errorMessage && (
              <span className="text-red-600 text-[12px] font-medium p-0 m-0">
                {errorMessage}
              </span>
            )}
            <p className="text-[#231C16] font-medium text-md">
              Don't Have an Account?{" "}
              <span className="text-[#2FE6CC] font-medium underline cursor-pointer">
                <Link to={"/signup"}>Sign Up</Link>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
