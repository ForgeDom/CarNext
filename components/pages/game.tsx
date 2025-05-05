import { useState, FormEvent, SyntheticEvent } from 'react';
import carsData from '../../src/app/carsData.json';

interface UserData {
  name: string;
  age: number;
  weight: number;
  zodiac: string;
  music: string;
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

interface ClosestMatch {
  car: Car;
  score: number;
  mismatches: string[];
}

const Game = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [closestMatches, setClosestMatches] = useState<ClosestMatch[]>([]);

  // Унікальні знаки зодіаку з даних про автомобілі
  const zodiacSigns = Array.from(new Set(
    (carsData as { cars: Car[] }).cars.flatMap(car => car.suitableFor.zodiac)
  )).sort();

  // Унікальні жанри музики з даних про автомобілі
  const musicGenres = Array.from(new Set(
    (carsData as { cars: Car[] }).cars.flatMap(car => car.suitableFor.music)
  )).sort();

  const findClosestMatches = (userData: UserData): ClosestMatch[] => {
    return (carsData as { cars: Car[] }).cars.map(car => {
      const mismatches: string[] = [];
      let score = 0;

      // Перевірка віку
      const [minAge, maxAge] = car.suitableFor.age;
      if (userData.age < minAge || userData.age > maxAge) {
        mismatches.push(`вік (${minAge}-${maxAge} років)`);
      } else {
        score += 1;
      }

      // Перевірка ваги
      const [minWeight, maxWeight] = car.suitableFor.weight;
      if (userData.weight < minWeight || userData.weight > maxWeight) {
        mismatches.push(`вага (${minWeight}-${maxWeight} кг)`);
      } else {
        score += 1;
      }

      // Перевірка музики
      if (!car.suitableFor.music.includes(userData.music)) {
        mismatches.push(`музика (${car.suitableFor.music.join(', ')})`);
      } else {
        score += 1;
      }

      // Перевірка знаку зодіаку
      if (userData.zodiac && !car.suitableFor.zodiac.includes(userData.zodiac)) {
        mismatches.push(`знак зодіаку (${car.suitableFor.zodiac.join(', ')})`);
      } else if (userData.zodiac) {
        score += 1;
      }

      return { car, score, mismatches };
    }).sort((a, b) => b.score - a.score).slice(0, 3); // Беремо топ-3 найближчих варіанти
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuggestions([]);
    setClosestMatches([]);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const userData: UserData = {
        name: formData.get('name')?.toString() || '',
        age: parseInt(formData.get('age')?.toString() || '0'),
        weight: parseInt(formData.get('weight')?.toString() || '0'),
        zodiac: (formData.get('zodiac')?.toString() || '').toLowerCase(),
        music: formData.get('fav-genre')?.toString() || ''
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
        // Знаходимо найближчі варіанти
        const matches = findClosestMatches(userData);
        setClosestMatches(matches);

        // Формуємо рекомендації
        const suggestionsList = [];
        
        // Перевіряємо вік
        const ageRange = (carsData as { cars: Car[] }).cars.flatMap(car => car.suitableFor.age);
        const minAge = Math.min(...ageRange);
        const maxAge = Math.max(...ageRange);
        if (userData.age < minAge || userData.age > maxAge) {
          suggestionsList.push(`Ваш вік повинен бути в межах від ${minAge} до ${maxAge} років`);
        }

        // Перевіряємо вагу
        const weightRange = (carsData as { cars: Car[] }).cars.flatMap(car => car.suitableFor.weight);
        const minWeight = Math.min(...weightRange);
        const maxWeight = Math.max(...weightRange);
        if (userData.weight < minWeight || userData.weight > maxWeight) {
          suggestionsList.push(`Ваша вага повинна бути в межах від ${minWeight} до ${maxWeight} кг`);
        }

        // Перевіряємо музику
        if (!musicGenres.includes(userData.music)) {
          suggestionsList.push(`Оберіть один з доступних жанрів музики: ${musicGenres.join(', ')}`);
        }

        // Перевіряємо знак зодіаку
        if (userData.zodiac && !zodiacSigns.includes(userData.zodiac)) {
          suggestionsList.push(`Оберіть один з доступних знаків зодіаку: ${zodiacSigns.join(', ')}`);
        }

        setSuggestions(suggestionsList);
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
    target.src = '/photos/cars/alfa-romeo-8c-2900.jpeg';
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
              <select id="zodiac" name="zodiac">
                <option value="">Оберіть знак зодіаку</option>
                {zodiacSigns.map((sign) => (
                  <option key={sign} value={sign}>
                    {sign.charAt(0).toUpperCase() + sign.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid-item">
              <label htmlFor="fav-genre">Улюблена музика*</label>
              <select id="fav-genre" name="fav-genre" required>
                <option value="">Оберіть жанр</option>
                {musicGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
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
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
              {suggestions.length > 0 && (
                <div className="suggestions">
                  <p>Рекомендації:</p>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="part2">
          <div className="new-photo">
            {selectedCar ? (
              <>
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.name} 
                  onError={handleImageError}
                />
                <h1>{selectedCar.name}</h1>
                <p>Категорія: {selectedCar.category}</p>
              </>
            ) : closestMatches.length > 0 ? (
              <>
                <img 
                  src={closestMatches[0].car.image} 
                  alt={closestMatches[0].car.name} 
                  onError={handleImageError}
                />
                <h1>{closestMatches[0].car.name}</h1>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;