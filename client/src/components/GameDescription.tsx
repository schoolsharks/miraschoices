import { Box, Stack, Typography, useTheme } from "@mui/material";

const GameDescription = () => {
  const theme = useTheme();
  const points = [
    "<b>Earn Ms. Tan’s full confidence (100% trust) before time runs out!</b>",
    "You start with <b>50% trust</b> and <b>200 game hours.</b> At every step, choose between two options—<b>each impacts trust and time.</b>",
  ];

  return (
    <>
      <Typography fontSize={"20px"} fontWeight={"400"}>
        Welcome to
      </Typography>
      <Typography
        fontSize="30px"
        fontWeight={"700"}
        marginTop={"8px"}
        sx={{
          [theme.breakpoints.up("md")]: {
            fontSize: "35px",
          },
        }}
      >
        The Balance Master Challenge!🎯
      </Typography>
      <Typography
        fontWeight={"400"}
        marginTop={"16px"}
        sx={{
          [theme.breakpoints.up("md")]: {
            fontSize: "20px",
          },
        }}
      >
        Your client, <b>“The Company”,</b> is a US based multinational with
        operations across Europe and Asia Pacific.
        <br />
        Recently, they underwent an organisational restructure, appointing a 
        <b>{" "}new Treasurer, Ms. Tan,</b> who is eager to streamline their banking
        relationships and processes.
      </Typography>

      <Typography
        fontSize="30px"
        fontWeight={"700"}
        marginTop={"25px"}
        marginBottom={"10px"}
        sx={{
          [theme.breakpoints.up("md")]: {
            fontSize: "35px",
          },
        }}
      >
        Your Mission?{" "}
      </Typography>
      <Stack>
        {points.map((point, index) => (
          <Stack direction={"row"} margin={"5px 0"} gap="6px">
            <Box
              width={"12px"}
              height={"12px"}
              borderRadius={"50%"}
              marginTop={"6px"}
              sx={{
                background: "linear-gradient(90deg,#ffffff,#000000)",
                aspectRatio: "1/1",
              }}
            />
            <Typography
              key={index}
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: "20px",
                },
              }}
              dangerouslySetInnerHTML={{ __html: point }}
            >
              {/* {point} */}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Typography marginTop={"12px"} marginLeft={"17px"} sx={{
          [theme.breakpoints.up("md")]: {
            fontSize: "20px",
          },
        }}>
        Be smart, act fast, and maximize efficiency to stay ahead. Poor choices
        waste time and risk losing Ms. Tan’s trust.
      </Typography>
    </>
  );
};

export default GameDescription;
