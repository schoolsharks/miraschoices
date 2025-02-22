import { ArrowBack } from "@mui/icons-material";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleHaptic } from "../../../utils/haptic";

const OptionA = ({
  text,
  onOptionSelect,
}: {
  text: string;
  onOptionSelect: () => void;
}) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isActive) {
        const currentX = e.clientX;
        if (currentX < startX && !isLargeScreen) {
          setPosition(currentX - startX);
        }
      }
    };

    const handleMouseUp = () => {
      if (isActive) {
        setIsActive(false);
        const elapsedTime = Date.now() - startTime;
        const endX = position + startX;
        const distance = startX - endX;
        const velocity = distance / elapsedTime;

        if (isLargeScreen && elapsedTime < 500) {
          setPosition(-window.innerWidth);
          onOptionSelect();
        }

        if (distance > 150 && velocity > 0.5) {
          setPosition(-window.innerWidth);
          onOptionSelect();
          handleHaptic();
        } else {
          setPosition(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isActive, startX, startTime, position, onOptionSelect, isLargeScreen]);

  const handleOnTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // added type annotation
    setIsActive(true);
    setStartX(e.targetTouches[0].clientX);
    setStartTime(Date.now());
    handleHaptic();
  };

  const handleOnTouchEnd = () => {
    setIsActive(false);
    const elapsedTime = Date.now() - startTime;
    const endX = position + startX;
    const distance = startX - endX;
    const velocity = distance / elapsedTime;

    if (distance > 150 && velocity > 0.5) {
      setPosition(-window.innerWidth);
      onOptionSelect();
      handleHaptic();
    } else {
      setPosition(0);
    }
  };

  const handleOnTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // added type annotation
    const currentX = e.targetTouches[0].clientX;
    if (currentX < startX) {
      setPosition(currentX - startX);
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // added type annotation
    setIsActive(true);
    setStartX(e.clientX);
    setStartTime(Date.now());
    handleHaptic();
  };

  return (
    <Stack
      flexDirection={"row"}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onTouchMove={handleOnTouchMove}
      onMouseDown={handleOnMouseDown}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={theme.palette.primary.main}
      padding={"20px 12px 20px 55px"}
      borderRadius={"30px"}
      border={`2px solid ${theme.palette.primary.main}`}
      position={"absolute"}
      right={`8px`}
      maxWidth={"900px"}
      gap={"12px"}
      width={"100%"}
      sx={{
        cursor: "pointer",
        scale: isActive ? "1.05" : "1",
        transition: "scale 0.3s ease",
        userSelect: "none",
        minHeight: "4.5rem",
        transform: `translateX(${position - 36}px)`,
        [theme.breakpoints.up("sm")]: {
          right: "150px",
        },
      }}
    >
      <Typography
        variant="body1"
        fontWeight={"700"}
        textAlign={"right"}
        width={"100%"}
        sx={{
          marginLeft: "28px",
          [theme.breakpoints.up("sm")]: { marginLeft: "170px" },
        }}
      >
        {text}
      </Typography>
      <Stack alignItems={"center"}>
        <Typography fontSize={"1.2rem"} fontWeight={"700"}>
          A
        </Typography>
        {!isLargeScreen && <ArrowBack />}
      </Stack>
    </Stack>
  );
};

export default OptionA;
