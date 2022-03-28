import { useState, useEffect } from "react";
import contactsPlug from "./services/contactsPlug";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    }
  ]);
  const [newName, setNewName] = useState("....add new Contact");
  const [newNumber, setNewNumber] = useState("....add Contact Number");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("....filter contacts");

  const hook = () => {
    console.log("effect");
    const promise = contactsPlug.getAllContacts();
    const eventHandler = (initialContactsList) => {
      console.log("promise fulfilled");
      console.log(initialContactsList);
      setPersons(initialContactsList);
    };
    promise.then(eventHandler);
  };
  useEffect(hook, []);

  const updateContact = () => {
    const updateMessage = `${newName} is already in contacts, replace the old number with the new one?`;
    const confirmUpdate = window.confirm(updateMessage);
    if (confirmUpdate) {
      const personToUpdate = persons.find((person) => person.name === newName);
      const updatedPerson = { ...personToUpdate, number: newNumber };
      const promise = contactsPlug.updateContact(updatedPerson);
      promise.then(() => {
        const updatedPersons = persons.map((person) =>
          person.name === newName ? updatedPerson : person
        );
        setPersons(updatedPersons);
        setNewName("");
        setNewNumber("");
      });
    } else {
      setNewName("");
      setNewNumber("");
    }
  };

  const createContact = () => {
    const contact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    const promise = contactsPlug.createContact(contact);
    const eventHandler = (newContact) => {
      console.log("create contact promise fulfilled");
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
    };
    promise.then(eventHandler);
  };

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) updateContact();
    else createContact();
  };

  const deleteContact = (event) => {
    const name = event.target.getAttribute("name");
    const deleteMessage = `Delete ${name}?`;
    const confirmDelete = window.confirm(deleteMessage);
    if (confirmDelete)
      setPersons(persons.filter((contact) => contact.name !== name));
  };

  const handleNameEntry = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberEntry = (event) => {
    setNewNumber(event.target.value);
  };
  const contactsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.startsWith(filter));

  const handleFilterEntry = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
    if (filter !== "") {
      setShowAll(!showAll);
    }
  };

  const handleSubmitFilter = (event) => {
    event.preventDefault();
    setShowAll(!showAll);
  };

  return (
    <div>
      <h1>Contact List</h1>
      <Filter
        filter={filter}
        handleFilter={handleFilterEntry}
        handleSubmit={handleSubmitFilter}
      />
      <ContactForm
        add={addContact}
        name={newName}
        number={newNumber}
        handleName={handleNameEntry}
        handleNumber={handleNumberEntry}
      />
      <Contacts
        filteredContacts={contactsToShow}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
