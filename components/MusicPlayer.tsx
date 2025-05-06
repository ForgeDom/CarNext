"use client";
import musicList from "@public/music-list.json";
import { useRef, useState, useEffect } from "react";

const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicSrc, setMusicSrc] = useState(musicList[0]);
    const [musicIndex, setMusicIndex] = useState(0);
    const [isMusicPlayed, setIsMusicPlayed] = useState(false);
    const trackNameRef = useRef<HTMLDivElement>(null);

    const calculateAnimationDuration = (text: string) => {
        // Base duration for average length text
        const baseDuration = 10;
        // Adjust duration based on text length
        const lengthFactor = text.length / 20; // 20 is the average expected length
        // Minimum duration of 5s, maximum of 15s
        return Math.max(5, Math.min(15, baseDuration * lengthFactor));
    };

    useEffect(() => {
        if (trackNameRef.current) {
            const duration = calculateAnimationDuration(musicSrc);
            trackNameRef.current.style.setProperty('--animation-duration', `${duration}s`);
        }
    }, [musicSrc]);

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
            <div id ="song_name"className="track-name" data-text={musicSrc} ref={trackNameRef}>{}</div>
            <div className="player-buttons">
                <button onClick={prevMusic}>Prev</button>
                <button onClick={PlayPause}>
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