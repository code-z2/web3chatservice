import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Body } from ".";
import { useWeb3Auth } from "../providers/web3AuthProvider";
import useWeb3 from "../hooks/useWeb3";
//import Blockie from "./Blockie";

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
  const { connect, isConnected, isConnecting, logout } = useWeb3Auth();
  const { getAddress } = useWeb3();

  return (
    <Body>
      <Card sx={{ width: "320px", height: "500px" }}>
        <CardHeader
          title="chat"
          action={
            isConnecting ? (
              <LoadingButton loading>Connecting</LoadingButton>
            ) : isConnected ? (
              <IconButton sx={{ color: "#adf802" }} onClick={() => logout()}>
                {console.log(getAddress())}
                {/* <Blockie address={getAddress()} size={7} />  */} {/*errors out before event is emitted */}
                <FiberManualRecordIcon />
              </IconButton>
            ) : (
              <Chip label="Login" onClick={() => connect()} />
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
