import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import TotalPlayers from "../../components/TotalPlayers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OurButton from "../../components/Button";
import { Home } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useScoreboard, { Archetype } from "../../hooks/useScoreboard";

const Leaderboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, rank, cash, investments, loan, avgResponseTime, totalPlayers } =
    useSelector((state: RootState) => state.user);

  const netWorth = cash + investments + loan;
  const { leaderboard, handleFetchLeaderboard, archetypePercentages } =
    useScoreboard();

  useEffect(() => {
    handleFetchLeaderboard();
  }, []);

  if (!leaderboard) {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
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
      flex={"1"}
      margin={"auto"}
      alignItems={"center"}
      sx={{
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="700"
        textAlign="center"
        color={theme.palette.primary.main}
        marginTop="16px"
      >
        Leader Board
      </Typography>
      <TotalPlayers players={totalPlayers} />
      <Stack
        alignItems={"center"}
        height={"40%"}
        width={"100%"}
        maxWidth={"900px"}
        marginBottom={"48px"}
      >
        <Stack
          color={theme.palette.primary.main}
          width="90%"
          marginTop="50px"
          minHeight={"20vh"}
        >
          <Grid2 container sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 5 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="left">
                Name
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 3 }}>
              <Typography fontWeight="700" fontSize="1rem" textAlign="center">
                Seconds
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 3.5 }}>
              <Typography
                fontWeight="700"
                fontSize="1rem"
                textAlign="center"
                minWidth={"max-content"}
              >
                Net Worth
              </Typography>
            </Grid2>
          </Grid2>
          {[...leaderboard]?.slice(0, 3)?.map((player, index) => {
            return (
              <Grid2
                container
                key={player.name}
                sx={{
                  width: "100%",
                  border: rank === index+1 ? `1px solid #00416A` : index < 3 ? "1px solid #fff" : "none",
                  borderRadius: "12px",
                  padding: "2px 5px",
                  marginTop: "10px",
                  position: "relative",
                }}
              >
                {index < 3 && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      position: "absolute",
                      top: "-2px",
                      left: "-6px",
                      bgcolor: "#FFEFDA",
                      borderRadius: "50%",
                      width: "13px",
                      height: "13px",
                    }}
                  >
                    <Typography sx={{ color: "#FFC328", fontSize: "12px" }}>
                      {index + 1}
                    </Typography>
                  </Stack>
                )}
                <Grid2
                  size={{ xs: 5 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "4px",
                  }}
                >
                  <Typography
                    fontWeight="500"
                    fontSize="0.9rem"
                    textAlign="left"
                  >
                    {player.name?.split(" ")[0]}
                  </Typography>
                </Grid2>
                <Grid2
                  size={{ xs: 3 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    fontWeight="500"
                    fontSize="0.9rem"
                    textAlign="center"
                    sx={{ width: "100%" }}
                  >
                    {player.avgResponseTime.toFixed(2)}
                  </Typography>
                </Grid2>
                <Grid2
                  size={{ xs: 3.5 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    fontWeight="500"
                    fontSize="0.9rem"
                    textAlign="left"
                    minWidth={"max-content"}
                    sx={{
                      width: "max-content",
                      margin: "auto",
                      transform:
                        player.netWorth < 0 ? "translateX(-10px)" : "none",
                    }}
                  >
                    {Math.round(player.netWorth)}
                  </Typography>
                </Grid2>
              </Grid2>
            );
          })}

          {rank >3 && <Grid2
            container
            key={name}
            sx={{
              width: "100%",
              border: `1px solid #00416A`,
              borderRadius: "12px",
              padding: "2px 5px",
              marginTop: "10px",
              position: "relative",
            }}
          >
               <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      position: "absolute",
                      top: "-2px",
                      left: "-6px",
                      bgcolor: "#FFEFDA",
                      borderRadius: "50%",
                      width: "13px",
                      height: "13px",
                    }}
                  >
                    <Typography sx={{ color: "#FFC328", fontSize: "12px" }}>
                      {rank}
                    </Typography>
                  </Stack>
            <Grid2
              size={{ xs: 5 }}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "4px",
              }}
            >
              <Typography fontWeight="500" fontSize="0.9rem" textAlign="left">
                {name?.split(" ")[0]}
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 3 }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                fontWeight="500"
                fontSize="0.9rem"
                textAlign="center"
                sx={{ width: "100%" }}
              >
                {avgResponseTime.toFixed(2)}
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 3.5 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                fontWeight="500"
                fontSize="0.9rem"
                textAlign="left"
                minWidth={"max-content"}
                sx={{
                  width: "max-content",
                  margin: "auto",
                  transform: netWorth < 0 ? "translateX(-10px)" : "none",
                }}
              >
                {Math.round(netWorth)}
              </Typography>
            </Grid2>
          </Grid2>}
        </Stack>
        <Stack
          sx={{
            bgcolor: "#00416A",
            borderRadius: "25px",
            padding: "8px 20px",
            marginTop: "18px",
          }}
        >
          <Typography color="#fff" fontSize={"14px"} fontWeight={"500"}>
            (NET Worth = Cash + Investments - Loan)
          </Typography>
        </Stack>

        <Stack
          alignItems={"center"}
          marginTop={"20px"}
          bgcolor={"#fbf9ed79"}
          padding={"40px 20px"}
          position={"relative"}
          sx={{ borderRadius: "8px", width: "90vw", maxWidth: "430px" }}
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
              maxHeight: "190px",
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
      <Stack
        alignItems="center"
        marginTop={"auto"}
        maxWidth={"900px"}
        width="100%"
        marginBottom={"50px"}
        position={"relative"}
      >
        <Box width="80%" height="4px" bgcolor="#fff" borderRadius="4px" />
        <Box
          onClick={() => navigate("/home")}
          position="absolute"
          left="50%"
          sx={{
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <OurButton>
            <Home sx={{ fontSize: "36px" }} />
          </OurButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Leaderboard;
