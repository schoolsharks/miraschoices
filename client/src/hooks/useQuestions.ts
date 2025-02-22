import { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/user/userSlice";

interface Option {
  option: string;
  optionText: string;
}

interface Question {
  quesId: string;
  question: string;
  options: Option[];
}


const useQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading,setLoading]=useState<boolean>(false)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  const fetchNextQuestion = async (quesId: string, option: string) => {
    setLoading(true)
    try {
      const response = await userApi.post("/users/question", {
        quesId,
        option,
      });
      if (response.data.success) {
        const { nextQuestion, gameStatus, loan, cash, investments ,totalQuestions,answered} =
          response.data.data;

        dispatch(setUser({ loan, cash, investments,totalQuestions,answered }));
        setCurrentQuestion(nextQuestion);
        if (gameStatus === "COMPLETED") {
          navigate("/completed");
        }
      } else {
        console.error("Failed to fetch the next question:", response.data);
      }
    } catch (error) {
      console.error("Error fetching the next question:", error);
    }
    finally{
      setLoading(false)
    }
  };


  return {
    loading,
    currentQuestion,
    fetchNextQuestion,
  };
};

export default useQuestions;
