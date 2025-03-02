import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/images/signup_img.png";
import { auth, db } from "../services/FirebaseConfig";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please give all the details to Sign Up ");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );

      const user = userCredential.user;
      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
      });
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/email-already-in-use") {
        setErrorMessage(
          "This email is already in use. Please use another email or login with this email."
        );
      }

      if (errorCode === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters long.");
      }
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  });

  return (
    <>
      <div className="bg-background py-8 px-7 min-h-screen flex flex-col md:flex-row justify-center gap-20 items-center shadow-2xl">
        <motion.div
          className="task-vector-img w-80 md:w-md"
          variants={leftVariant}
          initial="hidden"
          animate="visible"
        >
          <img src={signup} alt="task-vector-img" />
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
              Create a new account to make every day productive
            </p>
          </div>

          {/* Sign In Forms */}
          <div className="w-full flex flex-col items-center gap-6 bg-white py-14 rounded-2xl">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border-2 w-3/4 p-1.5 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-2 w-3/4 p-1.5 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-2 w-3/4 p-1.5 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
            />
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="border-2 w-3/4 p-1.5 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
            />

            <button
              onClick={handleSignUp}
              className="bg-[#2FE6CC] w-2/4 cursor-pointer font-bold hover:text-[#2FE6CC] hover:bg-transparent hover:outline-[#2FE6CC] py-2 px-7 rounded-2xl outline-2 transition-all duration-500"
            >
              Sign Up
            </button>
            {errorMessage && (
              <span className="text-red-600 text-[12px] font-medium p-0 m-0">
                {errorMessage}
              </span>
            )}
            <p className="text-[#231C16] font-medium text-md">
              Already Have an Account?{" "}
              <span className="text-[#2FE6CC] font-medium underline cursor-pointer">
                <Link to={"/signin"}>Sign In</Link>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
