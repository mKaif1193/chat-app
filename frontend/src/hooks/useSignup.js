import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext, backendUrl } from "../context/AuthContext";
import axios from "axios";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setToken } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/auth/signup`, {
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      });
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data.user));
      setAuthUser(data.user);
      localStorage.setItem("chat-user-token", JSON.stringify(data.token));
      setToken(data.token);
      toast.success("Sign Up successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
