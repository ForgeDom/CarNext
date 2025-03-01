"use client";
import { useRouter } from "next/navigation";
import React from "react";
import History from "./pages/history";
import Home from "./pages/home";
import News from "./pages/news";
import Team from "./pages/team";
import Join from "./pages/join";
import Merch from "./pages/merch";
import Music from "./pages/music";
import { relative } from "path";

interface NavigationProps{
    setMainContent: (mainContent: React.JSX.Element) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setMainContent } ) => {
    
    return (
        <nav style={{position: "relative"}}>
            <ul>
                <li><a href="#" onClick={(e) => {setMainContent(<Home/>)}}>OldTimer</a></li>
                <li><a href="#" onClick={(e) => {setMainContent(<History/>)}}>Історія</a></li>
                <li><a href="#" onClick={(e) => {setMainContent(<News/>)}}>Новини</a></li>
                <li><a href="#" onClick={(e) => {setMainContent(<Team/>)}}>Наша команда</a></li>
                <li><a href="#" onClick={(e) => {setMainContent(<Join/>)}}>Приєднатись до клубу</a></li>
                <li><a href="#" onClick={(e) => {setMainContent(<Merch/>)}}>Наш мерч</a></li>
                <li><a href="#" onClick={(e) => {setMainContent(<Music/>)}}>Музика</a></li>
            </ul>
        </nav>
    );

}
export default Navigation;