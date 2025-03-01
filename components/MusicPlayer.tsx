"use client";
import musicList from "@public/music-list.json";
import { useRef, useState } from "react";

const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicSrc, setMusicSrc] = useState(musicList[0]);
    const [musicIndex, setMusicIndex] = useState(0);
    const [isMusicPlayed, setIsMusicPlayed] = useState(false);

    const PlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isMusicPlayed) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        setIsMusicPlayed(!isMusicPlayed);
    };

    const prevMusic = () => {
        let newIndex = musicIndex === 0 ? musicList.length - 1 : musicIndex - 1;

        setMusicIndex(newIndex);
        setMusicSrc(musicList[newIndex]);

        handleTrackChange(isMusicPlayed);
    };

    const nextMusic = () => {
        let newIndex = musicIndex === musicList.length - 1 ? 0 : musicIndex + 1;

        setMusicIndex(newIndex);
        setMusicSrc(musicList[newIndex]);

        handleTrackChange(isMusicPlayed);
    };

    const handleTrackChange = async (shouldPlay: boolean) => {
        const audio = audioRef.current;
        if (audio) {
            await audio.load();
            if (shouldPlay) {
                await audio.play();
            }
        }
    };


    return (
        <div className="music-player">
                    <label>{musicSrc}</label>

                    <div className="player-buttons">
                        <button onClick={prevMusic}>Prev</button>
                        <button onClick={PlayPause}
                            style={{
                                fontSize: "30px",
                                height: "50px",
                                width: "50px",
                                borderRadius: "100%",
                                lineHeight: "50px",
                                background: isMusicPlayed ? 
                                    "linear-gradient(45deg, rgba(0,0,0,.5), rgba(255, 0, 0, 0.3))" : 
                                    "linear-gradient(45deg, rgba(0,0,0,.5), rgba(0, 255, 76, 0.3))"
                            }}
                        >
                            {isMusicPlayed ? "⏸" : "⏵"}
                        </button>
                        <button onClick={nextMusic}>Next</button>
                    </div>

                    


                    <audio
                        ref={audioRef}
                        src={`/car_music/${musicSrc}`}
                        style={{ display: "none" }}
                        onEnded={() => nextMusic()}
                    />
                </div>
    );
}
export default MusicPlayer;