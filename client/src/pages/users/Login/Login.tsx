import {
  Box,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {   useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { createUser } from "../../../store/user/userActions";
import SwipeBar from "../../../components/SwipeBar";
import gameByWgab from "../../../assets/game-by-wgab.webp";

const Login = () => {
  // const navigate = useNavigate();
  const theme=useTheme()
  const [error,setError]=useState<string|null>(null)
  const dispatch=useDispatch<AppDispatch>()
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const handleChange = (field: any) => (e: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit=()=>{
    if(formValues.name.trim()===""){
      setError("Screen name is required")
    }
    // else if(formValues.email.trim()===""){
    //   setError("Email is required") 
    // }
    else{
      dispatch(createUser(formValues))
    }
  }

 

  return (
    <Stack
      className="user-login"
      width="100%"
      minHeight={window.innerHeight}
      height="100%"
      flex={1}
      position="relative"
      alignItems={"center"}
    >
      <Stack alignItems={"center"} marginTop={"14px"}>
        <Box component={"img"} src={gameByWgab} alt="" sx={{width:"93px",margin:"0 auto"}} />
      </Stack>
      <Stack>
        <Typography
          variant="h5"
          fontWeight={"700"}
          fontSize="2rem"
          marginTop={"40px"}
          color={theme.palette.primary.main}
        >
          Login
        </Typography>
      </Stack>
      <Stack
        width={"80%"}
        gap="1rem"
        sx={{ maxWidth: "430px" }}
        marginTop={"2rem"}
      >
        <TextField
          label="Screen Name *"
          variant="standard"
          placeholder="eg. Vanessa Jenson"
          value={formValues.name}
          onChange={handleChange("name")}
          sx={{
            "& .MuiInputLabel-root": {
              color: theme.palette.primary.main,
            },
            "& .MuiInputBase-root": {
              color: theme.palette.primary.main,
            },
          }}
          
        />
        <TextField
          label="Email"
          type="email"
          variant="standard"
          placeholder="eg. xoxo@gmail.com"
          value={formValues.email}
          onChange={handleChange("email")}
          sx={{
            "& .MuiInputLabel-root": {
              color: theme.palette.primary.main,
            },
            "& .MuiInputBase-root": {
              color: theme.palette.primary.main,
            },
          }}

        />
        <Typography color="#d61a1a" sx={{ minHeight: "1rem" }}>
          {error}
        </Typography>
      </Stack>

      <Stack
        width={"100%"}
        marginTop={"auto"}
        marginBottom={"24px"}
        maxWidth={"900px"}
      >
        <SwipeBar onSwipe={handleSubmit} />
      </Stack>
    </Stack>
  );
};

export default Login;
