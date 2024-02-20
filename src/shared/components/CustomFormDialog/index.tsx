import { forwardRef } from "react";
import { styled } from "@mui/system";
import { Dialog, Stack, Typography, useTheme } from "@mui/material";
import CustomButton from "@/src/shared/components/CustomButton";

const CustomFormDialog = forwardRef(
  (
    props: {
      open: boolean;
      onClose: () => void;
      onAccept?: () => void;
      title: string;
      text: string;
      form: JSX.Element;
      shown?: boolean;
    },
    ref
  ) => {
    const theme = useTheme();
    const { open, onClose, onAccept, title, text, shown, form, ...rest } =
      props;

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <Stack>
          <Stack
            height={"35px"}
            bgcolor={theme.palette.primary.main}
            justifyContent={"center"}
            alignItems={"left"}
            padding={1.5}
          >
            <Typography color={theme.palette.text.primary}>{title}</Typography>
          </Stack>

          <Stack padding={1.5} minHeight={"50px"}>
            <Typography>{text}</Typography>
          </Stack>
          <Stack padding={1.5}>{form}</Stack>
          <Stack>
            <Stack
              direction="row"
              justifyContent={"right"}
              padding={1.5}
              spacing={1}
            >
              <CustomButton
                text="Ok"
                onClick={onAccept}
                sx={{
                  backgroundColor: "#FF0000",
                  borderRadius: "800px",
                  width: "25%",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    );
  }
);

CustomFormDialog.displayName = "CustomAlertDialog";

export default CustomFormDialog;
