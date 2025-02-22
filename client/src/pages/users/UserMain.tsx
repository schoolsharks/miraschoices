import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Login/Login";
import { Stack } from "@mui/system";
import OnBoardingMain from "./Onboarding/OnBoardingMain";
import Questions from "./Question/Questions";
import Completed from "./Completed/Completed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUser } from "../../store/user/userActions";
import { CircularProgress } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Leaderboard from "./Leaderboard";
// import AnimatedPage from "../../utils/AnimatedPage";

const UserMain = () => {
  const dispatch=useDispatch<AppDispatch>()
  const {status,loading}=useSelector((state:RootState)=>state.user)
  const location = useLocation();
  const [windowHeight,setWindowHeight]=useState(window.innerHeight)

  useEffect(()=>{
    dispatch(fetchUser())
  },[])

  useEffect(()=>{
    setWindowHeight(window.innerHeight)
  },[window.innerHeight])


  if(loading){
    return <CircularProgress/>
  }

  return (
    <Stack sx={{ minHeight: windowHeight, height: "100%",maxWidth:"480px",margin:"auto",background:"linear-gradient(0deg, #00416A 14.16%, #D6B48D 42.42%, #FFEFDA 102.47%)"}}>
      <AnimatePresence>

      <Routes  location={location}>
        <Route path="/login" element={status==="LOGGED_IN"? <Navigate to="/questions"/>:<Login/> } />
        <Route path="/onboarding/:page" element={<OnBoardingMain/>} />
        <Route path="/questions" element={status==="IDLE"? <Navigate to="/login"/>:<Questions/>} />
        <Route path="/completed" element={status==="IDLE"? <Navigate to="/login"/>:<Completed />} />
        <Route path="/leaderboard" element={status==="IDLE"? <Navigate to="/login"/>:<Leaderboard />} />
        <Route path="/*" element={<Navigate to="/onboarding/1" />} />
      </Routes>
      </AnimatePresence>
    </Stack>
  );
};

export default UserMain;
