"use client";
import { useEffect, useState } from "react";
import photosList from "@public/photos-list.json";

const Home = () => {
    //const [interval, setMyInterval] = useState(3000);
    const [counter, setCounter] = useState(1);
    const [carImage, setCarImage] = useState("/photos/e28.jpg");
    const images = photosList.map((photo: string) => `/photos/${photo}`);

    // Function to change the image src based on the counter
    const changeImage = () => {
        setCounter((prevCounter) => (prevCounter + 1) % images.length);
    };

    // Function to change image when clicking next or previous
    const manualChange = (n: number) => {
        setCounter((prevCounter) => (prevCounter + n + images.length) % images.length);
    };


    useEffect(() => {
        const intervalId = setInterval(changeImage, 3000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        setCarImage(images[counter]);
    }, [counter, images]);
    

    return (
        <>
            <div className="slider">
                <img id="car_image" src={carImage} alt="Car image" />
            </div>
            <a className="prev" onClick={(e) => { manualChange(-1) }}>&#10094;</a>
            <a className="next" onClick={(e) => { manualChange(1) }}>&#10095;</a>
        </>
    )
}
export default Home;