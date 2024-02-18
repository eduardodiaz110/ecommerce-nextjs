import { forwardRef, ForwardedRef } from "react";
import { Button, ButtonProps, Typography, styled } from "@mui/material";
import theme from "../../../theme";

interface CustomButtonProps {
  text: string;
  delete?: boolean; // Nuevo prop opcional
}

const CustomButton = forwardRef(
  (
    { text, delete: isDelete, ...ButtonProps }: CustomButtonProps & ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyledButton
        {...ButtonProps}
        ref={ref}
        sx={{
          backgroundColor: isDelete
            ? theme.palette.error.main
            : theme.palette.success.main,
          "&:hover": {
            backgroundColor: isDelete
              ? theme.palette.error.dark
              : theme.palette.success.dark,
          },
          "&:active": {
            backgroundColor: isDelete
              ? theme.palette.error.light
              : theme.palette.success.light,
          },
        }}
      >
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
  borderRadius: 10,
  height: "39px",
  width: "100%",
}));

export default CustomButton;
