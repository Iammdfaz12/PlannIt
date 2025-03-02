import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import { SignIn } from "./pages/SignInPage";
import { SignUp } from "./pages/SignUp";
import { TaskManagementPage } from "./pages/task_management_page";


function App() {
  return (
    <div className="bg-background min-h-screen h-full">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LandingPage />}></Route> */}
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/"
            element={<TaskManagementPage />}
          ></Route>
          <Route path="/forgot_password" element={<ForgotPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
