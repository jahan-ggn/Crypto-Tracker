import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { makeStyles } from '@material-ui/core/styles';

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    }
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
