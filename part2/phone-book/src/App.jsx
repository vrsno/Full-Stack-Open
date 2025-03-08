import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("juan");
  const [number, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      const response = res.data;
      console.log(response);
      setPersons(response);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPersonObj = {
      name: newName,
      id: persons.length + 1,
      tel: number,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPersonObj));
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(showAll.toLowerCase())
  );

  const handleFilter = (event) => {
    setShowAll(event.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={showAll} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
