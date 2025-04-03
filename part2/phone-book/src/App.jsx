import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personServices from "./services/person";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("juan");
  const [number, setNumber] = useState("");
  const [showAll, setShowAll] = useState("");
  const [message, setMessage] = useState("added juan");

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // si la persona existe modificar el numero si o no
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, phone: number };

        personServices
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            console.error("Error updating number:", error);
            alert("There was an error updating the contact.");

            setMessage(
              `information of ${newName} has already been removed from server`
            );
          });
      }
      return;
    }

    // añadir

    const newPersonObj = {
      name: newName,
      phone: number,
    };
    personServices
      .create(newPersonObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNumber("");
        setMessage(`added ${newName}`);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)
    ) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(showAll.toLowerCase() || "")
  );

  const handleFilter = (event) => {
    setShowAll(event.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
