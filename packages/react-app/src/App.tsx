import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0px 3px 20px 0px rgba(0,0,0,0.2)",
            borderRadius: 10,
            padding: 10,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: "6px 7px",
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#ffff00",
        dark: "#10294c",
      },
      secondary: {
        main: "#ffb400",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
