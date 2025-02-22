import { useState } from "react";
import { userApi } from "../api/userApi";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user/userSlice";

interface Analytics {
  cash: number;
  loan: number;
  investments: number;
  netWorth: number;
  archeType: string;
}



const useCompleted = () => {
  const [analytics, setAnalytics] = useState<Analytics>();
  
  const dispatch=useDispatch<AppDispatch>()


  const fetchCompletedStatus = async () => {
    try {
      const response = await userApi.get("/users/completed");
      if (response.data.success) {
        const { analytics: gameAnalytics,userRank } = response.data.data;
        if(gameAnalytics.totalPlayers){
          dispatch(setUser({totalPlayers:gameAnalytics.totalPlayers,userRank}))
        }
        setAnalytics(gameAnalytics);
      } else {
        console.error("Failed to fetch game stats:", response.data);
      }
    } catch (error) {
      console.error("Error fetching game stats:", error);
    }
  };

  

  return { analytics, fetchCompletedStatus, };
};

export default useCompleted;