"use client";
import { useEffect, useState } from "react";
import photosList from "@public/photos-list.json";

const Home = () => {
    const [counter, setCounter] = useState(1);
    const [carImage, setCarImage] = useState("/photos/e28.jpg");
    const images = photosList.map((photo: string) => `/photos/${photo}`);

    const changeImage = () => {
        setCounter((prevCounter) => (prevCounter + 1) % images.length);
    };

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
        <div className="page-wrapper">
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
            </section>

            <div className="slider">
                <img id="car_image" src={carImage} alt="Car image" />
                <a className="prev" onClick={() => manualChange(-1)}>&#10094;</a>
                <a className="next" onClick={() => manualChange(1)}>&#10095;</a>
            </div>

            <section className="other-pages">
                <h2>Дізнайтесь більше про нас відвідуючи сторінки:</h2>
                <div className="page-descriptions">
                    <div className="page-box">
                        <div className="page-title">Історія</div>
                        <div className="page-text">Як виник клуб Oldtimer та як все починалося у Вінниці.</div>
                    </div>
                    <div className="page-box">
                        <div className="page-title">Наша команда</div>
                        <div className="page-text">Учасники клубу, які роблять спільноту живою та дружньою.</div>
                    </div>
                    <div className="page-box">
                        <div className="page-title">Новини</div>
                        <div className="page-text">Події, зустрічі та важливі анонси клубу.</div>
                    </div>
                    <div className="page-box">
                        <div className="page-title">Мерч</div>
                        <div className="page-text">Унікальні речі для поціновувачів ретро-авто (футболки, худі тощо).</div>
                    </div>
                    <div className="page-box">
                        <div className="page-title">Приєднатися</div>
                        <div className="page-text">Як стати частиною нашої спільноти.</div>
                    </div>
                </div>
            </section>

            <section className="after-slider">
                <p>Якщо ви потрапили на цю сторінку через візитівку, яку знайшли на своєму авто, значить ваше авто привернуло нашу увагу.</p>
                <p>Ви поділяєте наше захоплення старими автомобілями та вбачаєте в цьому сенс? — будемо раді вам!</p>
                <p>Для долучення до спільноти сконтактуйте з нами у зручний для вас спосіб:</p>
                <div className="contact-icons">
                    <div className="icon-box">
                        <a href="https://www.instagram.com/oldtimer.vn?igsh=MTR5YTc2ODNrbzhyNw==" target="_blank">
                            <img src="/icons/instagram-icon.png" alt="Instagram" className="icon-large" />
                        </a>
                        <a href="https://www.instagram.com/oldtimer.vn?igsh=MTR5YTc2ODNrbzhyNw==" target="_blank">
                            <div className="icon-label">oldtimer.vn</div>
                        </a>
                    </div>
                    <div className="icon-box">
                        <a href="https://chat.whatsapp.com/Gowc8wF1BGsKmyyi0MuVCB" target="_blank">
                            <img src="/icons/whatsapp-icon.png" alt="WhatsApp" className="icon-large" />
                        </a>
                        <a href="https://chat.whatsapp.com/Gowc8wF1BGsKmyyi0MuVCB" target="_blank">
                            <div className="icon-label">Oldtimer</div>
                        </a>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .page-wrapper {
                    background-color: #ffffff;
                    color: #000000;
                    min-height: 100vh;
                    padding: 0;
                    margin: 0;
                }

                .slider {
                    position: relative;
                    width: 100vw;
                    background-color: #ffffff;
                }

                .slider img {
                    width: 800px;
                    height: 500px;
                    object-fit: cover;
                    border-radius: 0;
                    display: block;
                    margin: 0 auto;
                }

                .prev,
                .next {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 16px;
                    color: black;
                    background-color: rgba(255, 255, 255, 0.8);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #333;
                }

                .prev {
                    left: 5vw;
                }

                .next {
                    right: 5vw;
                }

                .prev:hover,
                .next:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }

                .intro-section,
                .after-slider {
                    padding: 2rem;
                    margin: 0 auto;
                    text-align: left;
                    max-width: none;
                    width: 100%;
                }

                .contact-icons {
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    gap: 4rem;
                    flex-wrap: wrap;
                }

                .icon-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .icon-large {
                    width: 60px;
                    height: 60px;
                    transition: transform 0.3s ease;
                }

                .icon-large:hover {
                    transform: scale(1.2);
                }

                .icon-label {
                    margin-top: 8px;
                    padding: 4px 10px;
                    border: 1px solid #000;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #000;
                }

                .icon-label:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }

                .other-pages {
                    padding: 2rem;
                    background-color: #ffffff;
                    text-align: center;
                }

                .other-pages h2 {
                    font-size: 1.8rem;
                    margin-bottom: 2rem;
                    font-weight: 600;
                }

                .page-descriptions {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    max-width: 10000px;
                    margin: 0 auto;
                }

                .page-box {
                    background-color: #fff;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease;
                    max-width: 1000 px;
                }

                .page-box:hover {
                    transform: translateY(-5px);
                }

                .page-title {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #222;
                }

                .page-text {
                    font-size: 1rem;
                    color: #555;
                }
            `}</style>
        </div>
    );
};

export default Home;
