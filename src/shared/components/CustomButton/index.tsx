import { forwardRef, ForwardedRef } from "react";
import { Button, ButtonProps, Typography, styled } from "@mui/material";
import theme from "../../../theme";

interface CustomButtonProps {
  text: string;
}

const CustomButton = forwardRef(
  (
    { text, ...ButtonProps }: CustomButtonProps & ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyledButton {...ButtonProps} ref={ref}>
        <Typography
          color={theme.palette.text.secondary}
          fontSize={"16px"}
          fontWeight={500}
          textTransform={"none"}
        >
          {text}
        </Typography>
      </StyledButton>
    );
  }
);

CustomButton.displayName = "CustomButton";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  borderRadius: 10,
  height: "39px",
  width: "100%",
}));

export default CustomButton;
