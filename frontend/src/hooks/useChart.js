import { useEffect, useReducer } from 'react';



// Define your reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data2: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Define your custom hook
const useChart = (endpoint) => {
  const [state, dispatch] = useReducer(dataReducer, {
    data2: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/chart?endpoint=${endpoint}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data2 = await response.json();
        // console.log("Stock data fetched successfully:", data2);
        dispatch({ type: 'FETCH_SUCCESS', payload: data2 });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchData();

  }, [endpoint]);

  return state;
};

export default useChart;
