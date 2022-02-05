import { Avatar } from "@mui/material";
import Blockies from "react-blockies";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  if (!props.address) return <Avatar src="/broken-image.jpg" />;

  return (
    <Blockies
      seed={props.address.toLowerCase()}
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
