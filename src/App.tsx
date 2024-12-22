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
  const [selectedCity, setselectedCity] = useState<number | null>(null);
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
      <h1 className="text-center mb-4">City Explorer</h1>

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
      selectedIndex={selectedCity}
      />

      {/* City Description */}
      {selectedCity !== null && (
        <div className="mt-3">
          <h4>Description</h4>
          <p>{filteredCities[selectedCity].description}</p>{/* Display description based on filtered list */}
          </div>
      )}

      {/*Add New City Form*/}
      <div className="card mt-4 p-3">
        <h1>Add a New City</h1>
        <div className="mb-3">
          <input
          type="text"
          placeholder="City Name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          className="form-control w-50"/>
        </div>
        <div className="mb-3">
          <input
          type="text"
          placeholder="City Description"
          value={newCityDescription}
          onChange={(e) => setNewCityDescription(e.target.value)}
          className="form-control w-50"/>
        </div>
        </div> 

        {/* Add City Button Outside the Form */}
        <div className="d-flex justify-content-center mb-3">
          <button
          onClick={handleAddCity}
          className="btn btn-success"
          style={{
            padding: "0.5rem 1rem",
            display: "inline-block",
            margin: "12px",
            width: "auto",
          }}>
            Add City
          </button>
        </div>

        {/* Reset Selection Button */}
        <div className="d-flex justify-content-center mb-3">
          <button
            onClick={handleResetSelection}
            className="btn btn-danger"
            style={{
              padding: "0.5rem 1rem",
              display: "inline-block",
              width: "auto",
            }}>
              Reset City Selection
          </button>
        </div>
      </div>
  );
};

export default App;
