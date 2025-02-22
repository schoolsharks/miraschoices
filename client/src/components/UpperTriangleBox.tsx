import { Stack, SxProps, Theme } from "@mui/material";
import triangle from "../assets/triangle.svg";

const UpperTriangleBox = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx: SxProps<Theme>;
}) => {
  return (
    <Stack sx={{...sx,overflow:"hidden"}}>
      <img src={triangle} alt="" />
      <Stack sx={{ bgcolor: "#000000",marginTop:"-1px",flex:"1" }}>{children}</Stack>
    </Stack>
  );
};

export default UpperTriangleBox;
