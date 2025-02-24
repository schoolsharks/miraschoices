import { Stack, Typography, useTheme, Box, Grid2 } from "@mui/material";

import { useEffect } from "react";
import FlipMove from "react-flip-move";
import CountUp from "react-countup";
// import qrCode from "../../../assets/qr-code/qr-code.webp";
import { useNavigate } from "react-router-dom";
import { Cached, HomeOutlined } from "@mui/icons-material";
import TotalPlayers from "../../../components/TotalPlayers";
import useScoreboard, { Archetype } from "../../../hooks/useScoreboard";

const Scoreboard = () => {
  const role = "admin";
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    leaderboard,
    handleFetchLeaderboard,
    previousLeaderboardRef,
    totalPlayers,
    archetypePercentages,
    gameCompletion
  } = useScoreboard();

  useEffect(() => {
    let interval;
    handleFetchLeaderboard();

    interval = setInterval(() => {
      handleFetchLeaderboard();
    }, 50000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const handleRefresh=()=>{
    window.location.reload()
  }

  const archetypeStyles: Record<
    Archetype,
    { bgColor: string; borderColor: string }
  > = {
    "Risk-Taker": {
      bgColor: "#00416A",
      borderColor: "#FFEFDA",
    },
    "Security Seeker": {
      bgColor: "#FFEFDA",
      borderColor: "#00416A",
    },
    "Balanced Thinker": {
      bgColor: "#7793AF",
      borderColor: "#00416A",
    },
  };

  return (
    <Stack
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      margin={"auto"}
      alignItems={"center"}
      sx={{
        overflow: "hidden",
      }}
    >
       <Typography
          position={"absolute"}
          variant="h5"
          fontWeight="700"
          textAlign="center"
          marginTop={"24px"}
          justifySelf={"center"}
          color={theme.palette.primary.main}
        >
          Score Board
        </Typography>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
        width={"98%"}
        padding={"12px 6px"}
        position={"relative"}
      > 
      <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
        <Box
          onClick={() => navigate("/admin/home")}
          bgcolor={theme.palette.primary.main}
          padding={"8px"}
          color={"#ffffff"}
          height={"max-content"}
          borderRadius={"8px"}
          sx={{ cursor: "pointer" }}
        >
          <HomeOutlined sx={{ fontSize: "1.7rem", color: "#ffffff" }} />
        </Box>
        <Box
          onClick={handleRefresh}
          bgcolor={theme.palette.primary.main}
          padding={"8px"}
          color={"#ffffff"}
          height={"max-content"}
          borderRadius={"8px"}
          sx={{ cursor: "pointer" }}
        >
          <Cached sx={{ fontSize: "1.7rem", color: "#ffffff" }} />
        </Box>
        </Stack>
        <Stack direction={"row"} gap={"6px"} borderRadius={"5px"} overflow={"hidden"}>
          <Stack padding="8px 12px" bgcolor={theme.palette.primary.main} color={"#fff"}>
            <Typography fontWeight={"400"} fontSize={"15px"}>Game Completion</Typography>
            <Typography fontWeight={"800"} fontSize={"1.25rem"}>{gameCompletion.toFixed()}%</Typography>
          </Stack>
          <Stack padding="8px 12px" bgcolor={"#fff"}>
            <Typography fontWeight={"400"} fontSize={"15px"}>Live in Session</Typography>
            <Typography fontWeight={"800"} fontSize={"1.25rem"}>{totalPlayers}</Typography>
          </Stack>
        </Stack>
        {/* <img
          src={qrCode}
          alt=""
          style={{
            width: "90px",
            borderRadius: "12px",
            justifySelf: "flex-end",
            position: "absolute",
            right: "16px",
          }}
        /> */}
      </Stack>
      {/* <Typography
          variant="h5"
          fontWeight="700"
          textAlign="center"
          color={theme.palette.primary.main}
          marginTop="16px"
        >
          Score Board
        </Typography> */}

      <TotalPlayers players={totalPlayers} />

      <Stack
        direction={"row"}
        marginTop={"64px"}
        padding={"0 24px"}
        gap={"24px"}
        width={"100%"}
        justifyContent={"space-evenly"}
      >
        <Box
          flex={"1"}
          color={theme.palette.primary.main}
          component={FlipMove}
          sx={{
            display: "flex",
            maxWidth: "900px",
            height: "max-content",
            flexDirection: "column",
          }}
        >
          <Grid2
            container
            sx={{ width: "100%", margin: "auto" }}
            gap={"12px"}
            justifyContent={"center"}
          >
            <Grid2 size={{ xs: 1.5 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="left">
                Name
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 1 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="center">
                Rank
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 1.5 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="center">
                Seconds
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 2 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="center">
                Cash
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 1.5 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="center">
                Loan
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 1.5 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="right">
                Investments
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 1.5 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="right">
                Net Worth
              </Typography>
            </Grid2>
          </Grid2>
          {leaderboard.slice(0, 9)?.map((player, index) => {
            const prevPlayer = previousLeaderboardRef.current.find(
              (p) => p.name === player?.name
            );
            return (
              <Grid2
                container
                key={player?._id}
                gap={"12px"}
                justifyContent={"center"}
                sx={{
                  color: index > 4 ? "#ffffff" : "inherit",
                  marginTop: role === "admin" ? "8px" : "2px",
                }}
              >
                <Grid2 size={{ xs: 1.5 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="left"
                    fontSize={"1rem"}
                    margin="3px 0"
                  >
                    {player?.name?.split(" ")[0].slice(0, 10)}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 1 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="center"
                    fontSize={role === "admin" ? "1rem" : "0.9rem"}
                    margin="3px 0"
                  >
                    {index + 1}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 1.5 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="center"
                    fontSize={role === "admin" ? "1rem" : "0.9rem"}
                    margin="3px 0"
                  >
                    {player?.avgResponseTime.toFixed(2)}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 2 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="center"
                    fontSize={role === "admin" ? "1rem" : "0.9rem"}
                    margin="3px 0"
                  >
                    <CountUp
                      start={prevPlayer?.cash || 0}
                      end={player?.cash}
                      duration={1}
                    />
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 1.5 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="center"
                    fontSize={role === "admin" ? "1rem" : "0.9rem"}
                    margin="3px 0"
                  >
                    <CountUp
                      start={prevPlayer?.loan || 0}
                      end={player?.loan}
                      duration={1}
                    />
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 1.5 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="right"
                    fontSize={role === "admin" ? "1rem" : "0.9rem"}
                    margin="3px 0"
                  >
                    <CountUp
                      start={prevPlayer?.investments || 0}
                      end={player?.investments}
                      duration={1}
                    />
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 1.5 }}>
                  <Typography
                    fontWeight="500"
                    textAlign="right"
                    fontSize={role === "admin" ? "1rem" : "0.9rem"}
                    margin="3px 0"
                  >
                    <CountUp
                      start={prevPlayer?.netWorth || 0}
                      end={player?.netWorth}
                      duration={1}
                    />
                  </Typography>
                </Grid2>
              </Grid2>
            );
          })}
        </Box>

        <Stack
          alignItems={"center"}
          bgcolor={"#fbf9ed79"}
          padding={"40px 20px"}
          position={"relative"}
          sx={{ borderRadius: "8px", minWidth: "337px" }}
        >
          <Stack
            direction={"row"}
            sx={{
              borderWidth: "0 0 4px 4px",
              borderStyle: "solid",
              borderColor: theme.palette.primary.main,
              width: "80%",
              maxWidth: "430px",
              height: "100vh",
              maxHeight: "250px",
              position: "relative",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              color: theme.palette.primary.main,
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "-8px",
                left: "-16px",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              x
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                right: "0px",
                bottom: "-22px",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              y
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                left: "-16px",
                bottom: "-22px",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              0
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                left: "-2.5rem",
                top: "7rem",
                transform: "translateY(-50px) rotate(-90deg)",
                fontSize: "10px",
                fontWeight: "700",
              }}
            >
              Percentage
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "10px",
                fontWeight: "700",
                minWidth: "max-content",
              }}
            >
              Different Personalities
            </Typography>
            {archetypePercentages.map((archetype) => (
              <Stack
                alignItems="center"
                key={archetype.archetype}
                sx={{
                  width: "50px",
                  height: `calc(${archetype.percentage}% + 20px)`,
                  bottom: "0",
                  transition: "height 0.3s ease",
                  ...archetypeStyles[archetype.archetype],
                }}
              >
                <Typography
                  color={theme.palette.primary.main}
                  fontWeight={"700"}
                >
                  {archetype.percentage.toFixed(1)}%
                </Typography>
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderWidth: "2px 2px 0 2px",
                    borderStyle: "solid",
                    bgcolor: archetypeStyles[archetype.archetype].bgColor,
                    borderColor:
                      archetypeStyles[archetype.archetype].borderColor,
                  }}
                ></Stack>
              </Stack>
            ))}
          </Stack>
          <Stack
            alignItems={"flex-start"}
            gap={"2px"}
            marginTop={"36px"}
            margin={"36px 0 0 36px"}
            width={"100%"}
            // position={"absolute"}
            // right={"12px"}
            // top={"12px"}
          >
            {Object.keys(archetypeStyles).map((archetype) => (
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap="8px"
                key={archetype}
              >
                <Box
                  sx={{
                    width: "16px",
                    height: "16px",
                    bgcolor: archetypeStyles[archetype as Archetype].bgColor,
                    border: `2px solid ${
                      archetypeStyles[archetype as Archetype].borderColor
                    }`,
                  }}
                />
                <Typography fontSize="12px" color={"#00416A"}>
                  {archetype}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Scoreboard;
