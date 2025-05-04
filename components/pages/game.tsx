import { useState, FormEvent, SyntheticEvent } from 'react';
import carsData from '../../src/app/carsData.json';

interface UserData {
  name: string;
  age: number;
  weight: number;
  zodiac: string;
  music: string;
  birthDate: string;
}

interface Car {
  id: number;
  name: string;
  category: string;
  image: string;
  suitableFor: {
    age: [number, number];
    weight: [number, number];
    music: string[];
    zodiac: string[];
  };
}

const Game = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const userData: UserData = {
        name: formData.get('name')?.toString() || '',
        age: parseInt(formData.get('age')?.toString() || '0'),
        weight: parseInt(formData.get('weight')?.toString() || '0'),
        zodiac: (formData.get('zodiac')?.toString() || '').toLowerCase(),
        music: formData.get('fav-genre')?.toString() || '',
        birthDate: formData.get('birth-date')?.toString() || ''
      };

      if (!userData.age || !userData.weight) {
        throw new Error('Будь ласка, заповніть обов\'язкові поля (вік та вага)');
      }

      const suitableCars = (carsData as { cars: Car[] }).cars.filter((car) => {
        const [minAge, maxAge] = car.suitableFor.age;
        const [minWeight, maxWeight] = car.suitableFor.weight;
        
        return (
          userData.age >= minAge &&
          userData.age <= maxAge &&
          userData.weight >= minWeight &&
          userData.weight <= maxWeight &&
          car.suitableFor.music.includes(userData.music) &&
          (userData.zodiac ? car.suitableFor.zodiac.includes(userData.zodiac) : true)
        );
      });

      if (suitableCars.length === 0) {
        throw new Error('Не знайдено підходящих авто. Спробуйте інші параметри!');
      }

      // Random car selection
      const randomIndex = Math.floor(Math.random() * suitableCars.length);
      setSelectedCar(suitableCars[randomIndex]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Сталася невідома помилка');
      setSelectedCar(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/cars/default.jpg';
  };

  return (
    <>
      <link rel="stylesheet" href="/randomizer.css" />
      <div className="containera">
        <div className="part1">
          <form className="htmlForma" onSubmit={handleSubmit}>
            <div className="grid-item">
              <label htmlFor="name">Ім'я</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="grid-item">
              <label htmlFor="age">Вік*</label>
              <input 
                type="number" 
                id="age" 
                name="age" 
                min="18" 
                max="100" 
                required 
              />
            </div>
            <div className="grid-item">
              <label htmlFor="weight">Вага (кг)*</label>
              <input 
                type="number" 
                id="weight" 
                name="weight" 
                min="40" 
                max="150" 
                required 
              />
            </div>
            <div className="grid-item">
              <label htmlFor="zodiac">Знак зодіаку</label>
              <input 
                type="text" 
                id="zodiac" 
                name="zodiac" 
                placeholder="Наприклад: aries" 
              />
            </div>
            <div className="grid-item">
              <label htmlFor="fav-genre">Улюблена музика</label>
              <select id="fav-genre" name="fav-genre" required>
                <option value="">Оберіть жанр</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="metal">Metal</option>
                <option value="jazz">Jazz</option>
                <option value="classic">Classic</option>
                <option value="electronic">Electronic</option>
              </select>
            </div>
            <div className="grid-item"> 
              <label htmlFor="birth-date">Дата народження</label>
              <input type="date" id="birth-date" name="birth-date" />
            </div>
            <div className="grid-item button-container">
              <button 
                type="submit" 
                className="butona" 
                disabled={isLoading}
              >
                {isLoading ? 'Завантаження...' : 'Підібрати авто!'}
              </button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="part2">
          <div className="new-photo">
            {selectedCar && (
              <>
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.name} 
                  onError={handleImageError}
                />
                <h1>{selectedCar.name}</h1>
                <p>Категорія: {selectedCar.category}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
