import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  TextField,
  Avatar,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MetamaskLogo from "./images/metamask.png";
import GoogleLogo from "./images/google.png";
import { Body } from ".";
import { useWeb3Auth } from "../providers/web3AuthProvider";
import useWeb3 from "../hooks/useWeb3";
import Blockie from "./Blockie";
import { useState } from "react";
import Messages from "./Messages";

const styles = { width: 30, height: 30, backgroundColor: "#ffffff", p: 0.8 };

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#E8E8E8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#397474",
      borderWidth: "1px",
    },
  },
});

const Main = () => {
  const [session, setSession] = useState(false);
  const {
    connect,
    isConnected,
    isConnecting,
    openLogin,
    logout,
  } = useWeb3Auth();
  const { getAddress } = useWeb3();

  return (
    <Body>
      <Card
        sx={{ width: "320px", height: "500px", backgroundColor: "#E8E8E8" }}
      >
        {console.log(typeof getAddress())}
        <CardHeader
          title="chat"
          action={
            isConnecting ? (
              <LoadingButton loading>Connecting</LoadingButton>
            ) : isConnected ? (
              <IconButton
                aria-label="account"
                onClick={() => logout()}
                sx={{ ...styles, backgroundColor: "#adf802" }}
              >
                <Avatar sx={{ width: 25, height: 25 }}>
                  {typeof getAddress() === undefined ? (
                    <FiberManualRecordIcon />
                  ) : (
                    <Blockie address={getAddress()} size={7} />
                  )}
                </Avatar>
              </IconButton>
            ) : (
              <Stack direction="row">
                <IconButton aria-label="metamask" onClick={() => connect()}>
                  <Avatar alt="metamask" src={MetamaskLogo} sx={styles} />
                </IconButton>
                <IconButton aria-label="google" onClick={() => openLogin()}>
                  <Avatar alt="google" src={GoogleLogo} sx={styles} />
                </IconButton>
              </Stack>
            )
          }
        />
        <CardContent sx={{ height: 365 }}>
          {session ? (
            <Messages />
          ) : (
            <Chip
              label="Create Session"
              onClick={() => setSession(true)}
              sx={{
                mt: "50%",
                ml: "25%",
                color: "#ffffff",
                background: "#7dc4b2"
              }}
            />
          )}
        </CardContent>
        <CardActions disableSpacing>
          <CustomTextField
            id="input"
            variant="outlined"
            placeholder="type your message..."
          />
          <IconButton aria-label="send">
            <SendIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Body>
  );
};

export default Main;
