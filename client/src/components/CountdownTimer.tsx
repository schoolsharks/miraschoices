import { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";

const COUNTDOWN_TIME = 20*60 ;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem("countdownStartTime");
    const isRunningStored = localStorage.getItem("isRunning") === "true";

    if (storedTime && isRunningStored) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(storedTime, 10)) / 1000
      );
      return Math.max(COUNTDOWN_TIME - elapsedTime, 0);
    }
    return COUNTDOWN_TIME;
  });

  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem("isRunning") === "true";
  });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            setIsRunning(false);
            localStorage.removeItem("countdownStartTime");
            localStorage.removeItem("isRunning");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handleClick = () => {
    // If timer is not at initial time (20:00), reset it
    if (timeLeft !== COUNTDOWN_TIME) {
      setTimeLeft(COUNTDOWN_TIME);
      setIsRunning(false);
      localStorage.removeItem("countdownStartTime");
      localStorage.removeItem("isRunning");
      return;
    }

    // If timer is at initial time (20:00), start it
    localStorage.setItem("countdownStartTime", Date.now().toString());
    localStorage.setItem("isRunning", "true");
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes} : ${secs.toString().padStart(2, "0")}`;
  };


  return (
    <Stack alignItems={"flex-end"}>
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        boxShadow: "none",
        fontSize: "50px",
        fontWeight: "800",
        padding: "12px",
        height: "65px",
        "&:hover": { bgcolor: "#e4e4e4", boxShadow: "none" },
      }}
    >
      {formatTime(timeLeft)}
    </Button>
    {timeLeft===0?<Typography color="##444444" fontSize={"1.25rem"} marginTop={"-8px"} marginRight={"12px"} fontWeight={"500"}>Completed</Typography>:<></>}
    </Stack>
  );
}
