import { useState } from "react";
import { useAuthContext, backendUrl } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setToken } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/auth/logout`, {});
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      localStorage.removeItem("chat-user-token");
      setToken(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
