import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import QR_CODE from "../../../assets/qr-code/qr-code.webp";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  fetchCurrentSessionInfo,
  resetSession,
} from "../../../store/admin/sessionInfoActions";
import homeGraphic from "../../../assets/home-graphic.webp";
import CountdownTimer from "../../../components/CountdownTimer";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // const { livePlayers, gameCompletion } = useSelector(
  //   (state: RootState) => state.admin
  // );

  const [resetSessionDialog, setResetSessionDialog] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleResetSession = () => {
    setResetLoading(true);
    dispatch(resetSession())
      .then(() => {
        dispatch(fetchCurrentSessionInfo()).then(() =>
          setResetSessionDialog(false)
        );
      })
      .finally(() => {
        setResetLoading(false);
      });
  };

  return (
    <>
      <Stack padding={"40px 120px"} color={theme.palette.primary.main}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography fontSize={"60px"} fontWeight={"700"}>
            Mira’s Choices
          </Typography>
          <CountdownTimer />
        </Stack>
        <Typography
          fontSize="40px"
          fontWeight={"700"}
          marginTop={"16px"}
          sx={{ textShadow: "0 0 10px #ffffff" }}
        >
          Mira’s Journey: A Game of Choices and Consequences
        </Typography>
        <Typography
          fontSize="25px"
          color={theme.palette.primary.main}
          fontWeight={"500"}
        >
          Mira, an artisan with big dreams, must navigate financial decisions
          that shape her future. Should she take risks or play it safe? Invest
          or save? Each choice carries consequences, influencing her wealth,
          stability, and success. Will she thrive or struggle? The outcome is in
          your hands.
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          marginTop={"16px"}
        >
          <Stack flex={"1"} justifyContent={"space-between"}>
            <Stack>
              <Typography
                fontSize="25px"
                color={theme.palette.primary.main}
                fontWeight={"700"}
              >
                Play to:
                <br />
                Maximise Wealth
              </Typography>
              <Stack direction={"row"} gap={"30px"}>
                {/* <Typography color={"#ffffff"} fontSize={"1.5rem"} fontWeight="500">
            Play to: <br />
            Maximise Wealth <br />
            Maximise Customer Happiness
          </Typography> */}
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/admin/sessions/current-session/scoreboard")
                  }
                  sx={{
                    color: "#ffffff",
                    marginTop: "24px",
                    border: "3px solid #ffffff",
                    width: "max-content",
                    textTransform: "none",
                    fontSize: "1.5rem",
                    borderRadius: "16px",
                    "&:hover": { border: "3px solid #ffffff" },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setResetSessionDialog(true)}
                  sx={{
                    color: "#ffffff",
                    marginTop: "24px",
                    border: "3px solid #ffffff",
                    width: "max-content",
                    textTransform: "none",
                    borderRadius: "12px",
                    fontSize: "1.5rem",
                    "&:hover": { border: "3px solid #ffffff" },
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>

            <Stack marginTop={"18px"}>
              <img src={homeGraphic} alt="" style={{ width: "330px" }} />
            </Stack>
          </Stack>
          <Box>
            {" "}
            <img
              src={QR_CODE}
              alt=""
              style={{ borderRadius: "12px", maxWidth: "380px" }}
            />
          </Box>
        </Stack>
      </Stack>
      <Dialog
        open={resetSessionDialog}
        onClose={() => setResetSessionDialog(false)}
      >
        <Stack padding="1.5rem">
          <Typography fontSize={"20px"}>
            Are you sure you want to create new session?
          </Typography>
          <Stack
            direction={"row"}
            marginTop={"1rem"}
            gap="20px"
            marginLeft={"auto"}
          >
            <Button variant="contained" onClick={handleResetSession}>
              {resetLoading ? (
                <Stack
                  width="100%"
                  justifyContent="center"
                  alignItems={"center"}
                  height="100%"
                >
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                </Stack>
              ) : (
                "Yes"
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setResetSessionDialog(false)}
            >
              Cancel{" "}
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default Home;
