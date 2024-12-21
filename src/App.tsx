import React, { useState, useEffect } from 'react' ;
import './App.css'
import ListGroup from './ListGroup.tsx';

interface City {
  name: string;
  description: string;
}

const App: React.FC = () => {
  const initialCities: City[] = [
    { name: "Colombo",description: "The commercial capital of Srilanka."},
    { name: "Kandy",description: "Known for the Template of the Tooth Relic."},
    { name: "Galle",description: "Famous for its Dutch Fort and scenic views."},
  ];

  const loadCitiesFormLocalStorage = (): City[] => {
    const storedCities = localStorage.getItem("cities");
    return storedCities ? JSON.parse(storedCities) : initialCities;
  };

  const [cities, setCities] = useState<City[]>(loadCitiesFormLocalStorage());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectCity, setselectedCity] = useState<number | null>(null);
  const [newCityName, setNewCityName] = useState<string>("");
  const [newCityDescription, setNewCityDescription] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const filteredCities = cities.filter((city) =>
  city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityClick = (index: number): void => {
    setselectedCity(index);
  };

  const handleAddCity = (): void => {
    if (newCityName && newCityDescription) {
      const newCity: City = {
        name: newCityName,
        description: newCityDescription,
      };
      setCities((prevCities) => [...prevCities, newCity]);
      setNewCityName("");
      setNewCityDescription("");
    }
  };

  const handleResetSelection = (): void => {
    setselectedCity(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4"></h1>

      {/* Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
        type="text"
        placeholder="Search for a city"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="form-control w-50"/>
      </div>

      {/* List of cities */}
      <ListGroup
      items={filteredCities}
      heading="Available Cities"
      onItemClick={(index) => handleCityClick(index)}
      selectedIndex={SelectedCity}
      />

      {/* City Description */}
      {selectedCity !== null && (
        <div className="mt-3">
          <h4>Description</h4>
          <p>{filteredCities[selectedCity].description}</p>{/* Display description based on filtered list */}
          </div>
      )}

      {/*Add New City Form*/}    
  )
}

export default App;
