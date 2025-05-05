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
                <a className="prev" onClick={() => manualChange(-1)}>&#10094;</a>
                <a className="next" onClick={() => manualChange(1)}>&#10095;</a>
            </div>

            <section className="intro-section">
                <p>
                    <strong>OLDTIMER.VN</strong> — це автомобільна спільнота в місті Вінниця, метою якої є об'єднання людей,
                    що захоплюються старими автомобілями (янтаймери, олдтаймери, ретро), інколи мотоциклами.
                </p>
                <p>
                    Ми створюємо єдине середовище для спілкування (через закриту групу в месенджері), організації зустрічей,
                    взаємопідтримки та загального просування автомобільної культури в місті, а також пом'якшення бар'єрів
                    між суспільством та власниками "старих авто".
                </p>
                <p>
                    Якщо ви потрапили на цю сторінку через візитівку, яку знайшли на своєму авто, значить ваше авто привернуло нашу увагу.
                </p>
                <p>
                    Ви поділяєте наше захоплення старими автомобілями та вбачаєте в цьому сенс? — будемо раді вам!
                </p>
                <p>
                    Для долучення до спільноти сконтактуйте з нами у зручний для вас спосіб:
                    <br />
                    <a href="https://www.instagram.com/oldtimer.vn?igsh=MTR5YTc2ODNrbzhyNw==" target="_blank">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://chat.whatsapp.com/Gowc8wF1BGsKmyyi0MuVCB" target="_blank">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                    групу.
                </p>
            </section>

            <style jsx>{`
                .slider {
                    position: relative;
                    margin: 0 auto;
                }

                .slider img {
                    height: 40vw;
                    width: 60vw;
                    margin: 0 auto;
                    display: block;
                }

                .prev,
                .next {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 16px;
                    color: white;
                    background-color: rgba(33, 33, 33, 0.8);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .prev {
                    left: 20vw;
                }

                .next {
                    right: 20vw;
                }

                .prev:hover,
                .next:hover {
                    background-color: rgba(255, 255, 255, 0.5);
                }

                .intro-section {
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .intro-section a {
                    color: #0070f3;
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
};
export default Home;