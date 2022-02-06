import { List, ListItem, Chip } from "@mui/material";

const testSession = [
    { message: "hello", from: "0xsender", id: "0001" },
    { message: "hi", from: "0xorg", id: "0002" },
    { message: "am john, i'm having an issue", from: "0xsender", id: "0003" },
    { message: "what is your issue", from: "0xorg", id: "0004" },
    { message: "i cant create v3 LP", from: "0xsender", id: "0005" },
    { message: "what is the error msg?", from: "0xorg", id: "0006" },
];

const Messages = () => {
    return (
        <List
            sx={{ position: "relative", overflow: "auto", maxHeight: 350, flex: 1 }}
        >
            {testSession.map((message) => (
                <ListItem
                    key={message.id}
                    sx={{
                        mt: 2,
                        justifyContent: `${(message.from === "0xsender") ? "flex-end" : "flex-start"
                            }`,
                    }}
                >
                    <Chip label={message.message} sx={{
                        backgroundColor: `${message.from === "0xsender" ? "#7dc4b2" : !null
                            }`,
                    }} />
                </ListItem>
            ))}
        </List>
    );
};

export default Messages;
