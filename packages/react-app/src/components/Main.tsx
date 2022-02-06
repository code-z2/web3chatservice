import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
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

const styles = { width: 30, height: 30, backgroundColor: "#ffffff", p: 0.8 };

const testSession = [
  { message: "hello", from: "0xsender", id: "0001" },
  { message: "hi", from: "0xorg", id: "0002" },
  { message: "am john, i'm having an issue", from: "0xsender", id: "0003" },
  { message: "what is your issue", from: "0xorg", id: "0004" },
  { message: "i cant create v3 LP", from: "0xsender", id: "0005" },
  { message: "what is the error msg?", from: "0xorg", id: "0006" },
]

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
  const { connect, isConnected, isConnecting, openLogin, logout } = useWeb3Auth();
  const { getAddress } = useWeb3();

  return (
    <Body>
      <Card sx={{ width: "320px", height: "500px", backgroundColor: "#E8E8E8" }}>
        {console.log(typeof getAddress())}
        <CardHeader
          title="chat"
          action={
            isConnecting ? (
              <LoadingButton loading>Connecting</LoadingButton>
            ) : isConnected ? (
              <IconButton aria-label="account" onClick={() => logout()} sx={{ ...styles, backgroundColor: "#adf802", }}>
                <Avatar sx={{ width: 25, height: 25 }}>
                  {typeof getAddress() === undefined ? <FiberManualRecordIcon /> : <Blockie address={getAddress()} size={7} />}
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
          in here, a lot needs to happen
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
