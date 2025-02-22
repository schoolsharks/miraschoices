import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { userApi } from "../api/userApi";
import { setUser } from "../store/user/userSlice";

export interface LeaderboardItem {
    _id:string;
  name: string;
  rank: number;
  avgResponseTime: number;
  cash: number;
  loan: number;
  investments: number;
  netWorth: number;
}

export type Archetype = "Risk-Taker" | "Security Seeker" | "Balanced Thinker";

interface ArchetypePercentage {
  archetype: Archetype;
  percentage: number;
}

const useScoreboard = () => {
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [archetypePercentages, setArchetypePercentages] = useState<ArchetypePercentage[]>([]);
  const previousLeaderboardRef=useRef<LeaderboardItem[]>([])
  const dispatch=useDispatch<AppDispatch>()

  const handleFetchLeaderboard = async () => {
    try {
      const response = await userApi.get("/leaderboard");
      if (response.data.success) {
        const { topUsers, archetypePercentages: percentages,totalPlayers,userRank } = response.data.data;
        if(totalPlayers){
          dispatch(setUser({totalPlayers,rank:userRank}))
          setTotalPlayers(totalPlayers)
        }
        setLeaderboard(topUsers);
        setArchetypePercentages(percentages);
      } else {
        console.error("Failed to fetch the leaderboard:", response.data);
      }
    } catch (error) {
      console.error("Error fetching the leaderboard:", error);
    }
  };

  return { leaderboard, handleFetchLeaderboard, archetypePercentages,totalPlayers,previousLeaderboardRef};
};

export default useScoreboard;
