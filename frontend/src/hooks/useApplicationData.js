
import { useReducer, useEffect, useState } from "react";
const apiKey = '5zppMBtonCBY1SJ42kijFfL2V7co5_MN';
const symbol = 'AAPL';
const baseUrl = 'https://api.polygon.io/v1';

const url = `${baseUrl}/open-close/${symbol}/2023-01-09?adjusted=true&apiKey=${apiKey}`;

const initialState = {
  stockData: [],
  darkMode: false
};

const ACTIONS = {
  SET_STOCK_DATA: "SET_STOCK_DATA",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE"
};

const reducer = (state, action) => {
  switch (action.type) {
    
    case ACTIONS.SET_STOCK_DATA:
      return { ...state, stockData: action.payload };
    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(false);

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
    // Action creator for toggling dark mode
    dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
  };


return {
  state,
  darkMode,
  setDarkMode,
  toggleDarkMode
};
}

export default useApplicationData;