import { useReducer, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const apiKey = '5zppMBtonCBY1SJ42kijFfL2V7co5_MN';
const symbol = 'AAPL';
const baseUrl = 'https://api.polygon.io/v1';

const url = `${baseUrl}/open-close/${symbol}/2023-01-09?adjusted=true&apiKey=${apiKey}`;

const initialState = {
  stockData: [],
  darkMode: false,
  tickerCurrent: null,
  login: false,
  email: "",
  password: ""
};

const ACTIONS = {
  SET_STOCK_DATA: "SET_STOCK_DATA",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
  SET_CURRENT_TICKER: "SET_CURRENT_TICKER",
  SET_LOGIN_STATE: "SET_LOGIN_STATE",
  SET_EMAIL_STATE: "SET_EMAIL_STATE",
  SET_PASSWORD_STATE: "SET_PASSWORD_STATE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STOCK_DATA:
      return { ...state, stockData: action.payload };
    case ACTIONS.SET_CURRENT_TICKER:
      return { ...state, tickerCurrent: action.payload };
    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case ACTIONS.SET_LOGIN_STATE:
      return { ...state, login: !state.login };
    case ACTIONS.SET_EMAIL_STATE:
      return { ...state, email: action.payload }; // Fixed action
    case ACTIONS.SET_PASSWORD_STATE:
      return { ...state, password: action.payload }; // Fixed action
    default:
      return state;
  }
};


const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [login, setLogin] = useState(false); // Define setLogin state

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.SET_STOCK_DATA, payload: data });
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  const toggleDarkMode = () => {
    dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
  };

  const navigateToDetailsPage = (ticker, navigate) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TICKER, payload: ticker });
    navigate(`/stock/${ticker}`);
  };

  // const toggleLogIn = () => {
  //   setLogin(!login); // Toggle login state
  // }
  
  return {
    dispatch,
    state,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    email,
    setEmail,
    password,
    setPassword,
    navigateToDetailsPage
  };
};

export default useApplicationData;
