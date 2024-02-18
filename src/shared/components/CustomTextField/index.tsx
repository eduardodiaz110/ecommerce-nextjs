"use client";
import { forwardRef } from "react";
import { styled } from "@mui/system";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";

const CustomTextField = forwardRef(
  (props: { text: string; shown?: boolean } & TextFieldProps, ref) => {
    const { text, shown, ...rest } = props;
    const isNumberField = rest.type === "number";
    const isDisabled = rest.disabled;

    const backgroundColor = isDisabled
      ? shown
        ? "#ffffff"
        : "#EEEBEB"
      : "#fff";

    return (
      <Stack spacing={0.5}>
        <Typography fontSize={"12px"} fontWeight={400} textTransform={"none"}>
          {text}
        </Typography>

        <Stack
          flexDirection="row"
          alignItems="center"
          width="100%"
          paddingX={"8px"}
          style={{ backgroundColor: backgroundColor }}
        >
          {isNumberField && <Typography marginRight={"4px"}>$</Typography>}
          <StyledTextField
            InputProps={{
              ...rest.InputProps,
              style: {
                height: "31px",
                ...rest.InputProps?.style,
              },
            }}
            {...rest}
            // @ts-ignore typescript doesn't know about forwardRef

            ref={ref}
          />
        </Stack>
      </Stack>
    );
  }
);

CustomTextField.displayName = "CustomTextField";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
  },

  "& .MuiInputBase-root": {
    padding: "0px",
    border: "none",
    "&:hover": {
      border: "none",
    },
    "&:focus": {
      border: "none",
    },
    "&:active": {
      border: "none",
    },
    "&:disabled": {
      border: "none",
    },
  },
  " .MuiOutlinedInput-root": {
    borderRadius: "0px",
    padding: "0px",
    borderColor: "#FFFFFF",
    "& fieldset": {
      border: "none",
    },
    "& input": {
      padding: "0px 0px 0px 4px",
      fontSize: "14px",
    },
  },
}));

export default CustomTextField;
