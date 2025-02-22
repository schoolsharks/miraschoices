import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import OurButton from "../../../components/Button";
import { useSelector } from "react-redux";
import TotalPlayers from "../../../components/TotalPlayers";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import useCompleted from "../../../hooks/useCompleted";
import { useEffect } from "react";
import { Equalizer } from "@mui/icons-material";
import riskTaker from "../../../assets/badges/risk-taker.webp";
import securitySeeker from "../../../assets/badges/security-seeker.webp";
import balancedThinker from "../../../assets/badges/balanced-thinker.webp";

const Completed = () => {
  const theme = useTheme();
  const {name,totalPlayers}=useSelector((state:RootState)=>state.user)
  const { analytics, fetchCompletedStatus } = useCompleted();
  

  useEffect(() => {
    fetchCompletedStatus();
  }, []);
  const navigate = useNavigate();

  // const handleReset = () => {
  //   localStorage.clear();
  //   dispatch(reset());
  //   navigate("/home");
  // };

  if (!analytics) {
    return <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}><CircularProgress /></Stack>;
  }

  const fetchArcheTypeDetails=(archeType:string)=>{
    let icon="";
    let desc=""
    if(archeType==="Risk Taker"){
      icon=riskTaker
      desc="<p>Risk-Taker wo hota hai jo bold decisions lene se nahi ghabrata. High returns ke liye high risks lena inka approach hota hai. Ye log bade loans lete hain, aggressive investments karte hain, aur uncertain market opportunities ka faayda uthate hain. Inka main focus fast growth aur profit maximize karna hota hai, even if there’s a chance of loss.</p></br></br><b>Key Traits: Ambitious, bold, profit-driven.<b>"
    }
    else if(archeType==="Security Seeker"){
      icon=securitySeeker
      desc="<p>Security Seeker hamesha safe aur stable options choose karta hai. Risk minimize karna aur long-term security maintain karna inka priority hota hai. Ye log controlled spending karte hain, debt avoid karte hain aur safe investments ko prefer karte hain. Slow but steady growth inka main goal hota hai.</p></br></br><b>Key Traits: Cautious, stability-focused, risk-averse.<b>"
    }
    else{
      icon=balancedThinker
      desc="<p>Balanced Thinker risk aur security ke beech ek balance banakar chalta hai. Ye log calculated risks lete hain jab reward worth it ho, but at the same time, stability ko bhi ignore nahi karte. Situation analyze karke flexible decisions lete hain jo growth aur safety dono ko balance karte hain.</p></br></br><b>Key Traits: Strategic, adaptable, balanced approach.<b>"
    }
    return {icon,desc}
  }

  return (
    <Stack className="user-completed-page" minHeight={window.innerHeight} flex={"1"} height={"100%"}>
      <Typography
        variant="h5"
        fontWeight="700"
        textAlign="center"
        color={theme.palette.primary.main}
        marginTop="16px"
      >
        Challenge Completed
      </Typography>
      <TotalPlayers players={totalPlayers} />

      <Stack
        color={theme.palette.primary.main}
        borderRadius="16px"
        padding="1rem"
        border={`2px solid ${theme.palette.primary.main}`}
        margin="4em 24px 0"
        gap="8px"
      >
        <Typography fontSize={"1.5rem"} fontWeight="500">
          {name}
        </Typography>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Cash</Typography>
          <Typography fontWeight="700">{Math.round(analytics.cash)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Loan</Typography>
          <Typography fontWeight="700">{Math.round(analytics.loan)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Investments</Typography>
          <Typography fontWeight="700">{Math.round(analytics.investments)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Net Worth</Typography>
          <Typography fontWeight="700">{Math.round(analytics.cash + analytics.loan + analytics.investments)}</Typography>
        </Stack>
      </Stack>
      <Stack
        color={"#ffffff"}
        borderRadius="16px"
        padding="1rem"
        border={`2px solid #ECD3B6`}
        margin="1rem 24px 0"
        gap="8px"
        marginBottom={"56px"}
      >
        <Stack direction={"row"} gap={"12px"}>
          <Box src={fetchArcheTypeDetails(analytics.archeType).icon} height={"66px"} alt="" component={"img"} />
          <Box color={theme.palette.primary.main}>
            <Typography fontSize={"20px"} fontWeight={"400"}>Your Personality</Typography>
            <Typography fontSize={"25px"} fontWeight={"600"}>{analytics.archeType}</Typography>
          </Box>
        </Stack>
        <Typography color="#FFEFDA" dangerouslySetInnerHTML={{ __html: fetchArcheTypeDetails(analytics.archeType).desc }}></Typography>
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
          onClick={()=>navigate("/leaderboard")}
          position="absolute"
          left="50%"
          sx={{
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <OurButton>
            <Equalizer sx={{fontSize:"36px"}}/>
          </OurButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Completed;
