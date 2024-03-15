import { useReducer, useEffect, useState } from "react";

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
    fetch("http://localhost:3001/stocks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched successfully:", data);
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