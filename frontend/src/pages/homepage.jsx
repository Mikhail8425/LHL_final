import React from "react";
import Searchbar from "../components/Searchbar";
import Stocklist from "../components/Stocklist";
import Indiceslist from "../components/Indiceslist";
import "../styles/homepage.scss";
 
const Homepage = () => {
    return (
        <div>
            <Searchbar />
            <div className="home-stock">
                <Stocklist />
                <Indiceslist />
            </div>
        </div>
    )
        
};
 
export default Homepage;