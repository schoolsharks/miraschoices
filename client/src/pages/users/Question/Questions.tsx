import {
  CircularProgress,
  LinearProgress,
  // CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import useQuestions from "../../../hooks/useQuestions";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import OptionA from "./OptionA";
import OptionB from "./OptionB";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import UpperTriangleBox from "../../../components/UpperTriangleBox";


const Questions = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const { cash, loan, investments,answered,totalQuestions } = useSelector(
    (state: RootState) => state.user
  );
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const {
    loading,
    currentQuestion,
    fetchNextQuestion,
  } = useQuestions();

  useEffect(() => {
    fetchNextQuestion("", "");
  }, []);

  const handleOptionClick = (quesId: string, option: string) => {
      fetchNextQuestion(quesId, option);
  };


  return (
    <>
     {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: isLargeScreen ? "-100%" : "0",
            width: isLargeScreen ? "175vw" : "100vw",
            height: `${window.innerHeight < 616 ? 616 : window.innerHeight}px`,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.079)",
            clipPath: "-10px -10px -10px -50px",
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </motion.div>
      )}
      {currentQuestion && (
        <Stack
          padding="0 12px"
          height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
          sx={{ overflowX: "hidden" }}
        >
          <Stack
            direction="row"
            marginTop="24px"
            justifyContent="space-around"
            color={theme.palette.primary.main}
          >
            <Stack alignItems="center" flex={1}>
              <Typography fontWeight={"500"}>Cash</Typography>
              <Typography variant="h6" fontWeight={"700"}>
                {cash.toFixed()}
              </Typography>
            </Stack>
            <Stack alignItems="center" flex={1} fontWeight={"500"}>
              <Typography>Loan</Typography>
              <Typography variant="h6" fontWeight={"700"}>
                {loan.toFixed()}
              </Typography>
            </Stack>
            <Stack alignItems="center" flex={1} fontWeight={"500"}>
              <Typography>Investments</Typography>
              <Typography variant="h6" fontWeight={"700"}>
                {investments.toFixed()}
              </Typography>
            </Stack>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={(answered * 100) / totalQuestions}
            sx={{
              margin: "16px 0 8px",
              borderRadius: "2px",
              "& .MuiLinearProgress-bar": {
                backgroundColor: theme.palette.primary.main,
              },
              backgroundColor: "#7793AF",
              boxShadow: "0 0 10px #ffffff",
            }}
          />
          <Stack justifyContent={"center"} height={"120px"} margin="16px 4px">
            <Typography
              color={theme.palette.primary.main}
              fontSize="1.3rem"
              fontWeight="700"
            >
              {currentQuestion.question}
            </Typography>
          </Stack>
          <Stack marginTop="16px" position="relative">
            {!loading && currentQuestion.options && (
              <>
                <OptionA
                  text={currentQuestion.options[0].optionText}
                  onOptionSelect={() =>
                    handleOptionClick(
                      currentQuestion.quesId,
                      currentQuestion.options[0].option
                    )
                  }
                />
                <OptionB
                  text={currentQuestion.options[1].optionText}
                  onOptionSelect={() =>
                    handleOptionClick(
                      currentQuestion.quesId,
                      currentQuestion.options[1].option
                    )
                  }
                />
              </>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Questions;
