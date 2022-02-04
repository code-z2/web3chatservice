import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  TextField,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import SendIcon from "@mui/icons-material/Send"
import { Body } from "."


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
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <Body>
      <Card sx={{ width: "320px", height: "500px" }}>
        <CardHeader
          title="chat"
          action={<Chip label="Login" onClick={handleClick} />}
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
