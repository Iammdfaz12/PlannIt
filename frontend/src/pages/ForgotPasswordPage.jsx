import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/FirebaseConfig";

export const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage(
        "Password reset email sent! Check your inbox or spam folder."
      );

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setResetMessage("No account found with this email.");
      } else if (errorCode === "auth/invalid-email") {
        setResetMessage("Please enter a valid email address.");
      } else {
        setResetMessage("An error occurred. Please try again later.");
        console.error("Password reset error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4">
        <input
          type="email"
          name="resetEmail"
          placeholder="Enter your email to reset password"
          value={resetEmail}
          onChange={(event) => setResetEmail(event.target.value)}
          className="border-2 w-3/4 py-1.5 px-2 rounded-2xl focus:outline-2 focus:border-none focus:outline-[#2FE6CC]"
        />
        <button
          onClick={handleForgotPassword}
          className="bg-[#2FE6CC] w-2/4 cursor-pointer font-bold hover:text-[#2FE6CC] hover:bg-transparent hover:outline-[#2FE6CC] py-2 px-7 rounded-2xl outline-2 transition-all duration-500"
        >
          Send Reset Link
        </button>
        <span className="text-red-600 text-[12px] font-medium">
          {resetMessage}
        </span>
      </div>
    </>
  );
};
