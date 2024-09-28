import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { backendUrl, useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const useSendMessage = () => {
  const { token } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/messages/send/${selectedConversation._id}`,
        { message },
        { headers: { token } }
      );
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
      toast.success(backendUrl)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
