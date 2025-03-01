const Game = () => {
    return (
        <>
        <link rel="stylesheet" href="/randomizer.css"/>
        <div className="containera">
            <div className="part1">
                <div className="htmlForma">
                    <div className="grid-item">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="weight">Weight</label>
                        <input type="number" id="weight" name="weight"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="zodiac">Zodiac</label>
                        <input type="text" id="zodiac" name="zodiac"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="fav-genre">Favorite Music Genre</label>
                        <select id="fav-genre" name="fav-genre">
                            <option value="rock">Rock</option>
                            <option value="pop">Pop</option>
                            <option value="metal">Metal</option>
                            <option value="country">Country</option>
                            <option value="jazz">Jazz</option>
                        </select>
                    </div>
                    <div className="grid-item"> 
                        <label htmlFor="birth-date">Day of Birth</label>
                        <input type="date" id="birth-date" name="birth-date"/>
                    </div>
                    <div className="grid-item button-container">
                        <button className="butona" id="generate">Generate!</button>
                    </div>
                </div>
            </div>
            <div className="part2">
                <div className="new-photo">
                    <img src="" alt=""/>
                    <em><h1></h1></em>
                </div>
            </div>
        </div>
        </>
    );
}
export default Game;