import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import homeGraphic from "../../../assets/home-graphic.webp";
import SwipeBar from "../../../components/SwipeBar";
import gameByWgab from "../../../assets/game-by-wgab.webp";
// import msTanImage from "../../../assets/ms-tan.png";

const OnBoardingMain = () => {
  const { page } = useParams();
  // const navigate = useNavigate();

  const currentPage = Number(page);

  return <Stack flex={"1"}>{currentPage === 1 && <Page1 />}</Stack>;
};

export default OnBoardingMain;

const Page1 = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOnSwipe = () => {
    navigate("/login");
  };
  return (
    <Stack
      width="100%"
      minHeight={window.innerHeight}
      height="100%"
      flex={1}
      position="relative"
    >
      <Box
        component={"img"}
        src={gameByWgab}
        alt=""
        sx={{ width: "93px",margin:"14px auto 0", }}
      />

      <Typography
        variant={"h3"}
        fontSize="30px"
        fontWeight="700"
        textAlign={"center"}
        zIndex={1}
        color={theme.palette.primary.main}
        margin={"35px auto 22px"}
        sx={{
          [theme.breakpoints.up("sm")]: {
            fontSize: "2.5rem",
          },
        }}
      >
        Mira’s Choices
      </Typography>
      <Stack>
        <img
          src={homeGraphic}
          alt=""
          style={{ maxWidth: "480px", margin: "auto", width: "100%" }}
        />
      </Stack>
      <Stack padding="0 16px" margin={"32px 0 16px"}>
        <Typography
          variant="body2"
          color={theme.palette.primary.main}
          fontSize={"1rem"}
          margin={"0 0 12px"}
          fontWeight={"700"}
        >
          Mira’s Journey: A Game of Choices and Consequences
        </Typography>
        <Typography
          variant="body2"
          color={"#ffffff"}
          fontWeight={"500"}
          fontSize={"1rem"}
        >
          Mira, an artisan with big dreams, must navigate financial decisions
          that shape her future. Should she take risks or play it safe? Invest
          or save? Each choice carries consequences, influencing her wealth,
          stability, and success. Will she thrive or struggle? The outcome is in
          your hands.
        </Typography>
        <Typography
          variant="body2"
          color={"#ffffff"}
          fontWeight={"700"}
          marginTop={"16px"}
          fontSize={"1rem"}
        >
          Play to:<br/> Maximize Wealth
        </Typography>
      </Stack>
      <Stack
        width={"100%"}
        marginTop={"auto"}
        marginBottom={"24px"}
        maxWidth={"900px"}
      >
        <SwipeBar onSwipe={handleOnSwipe} />
      </Stack>
    </Stack>
  );
};
