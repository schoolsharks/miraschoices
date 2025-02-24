import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { fetchCurrentSessionInfo } from "../../store/admin/sessionInfoActions";
import { Stack } from "@mui/material";
import Scoreboard from "./Scoreboard/Scoreboard";

const AdminMain = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(fetchCurrentSessionInfo())
  //   // const fetchInterval = setInterval(() => {
  //   //   dispatch(fetchCurrentSessionInfo());
  //   // }, 5000);
  //   // return () => clearInterval(fetchInterval);
  // }, [dispatch]);

  return (
    <Stack sx={{flex:"1",minHeight:window.innerHeight,background:"linear-gradient(0deg, #00416A 14.16%, #D6B48D 42.42%, #FFEFDA 102.47%)"}}>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route path="/home" element={<Home />} />
        <Route path="/sessions/current-session/scoreboard" element={<Scoreboard />} />
        {/* <Route path="/session/:id" element={<SessionDashboardMain />} /> */}
        <Route path="/*" element={<Navigate to="/admin/home" />} />
      </Routes>
    </Stack>
  );
};

export default AdminMain;
