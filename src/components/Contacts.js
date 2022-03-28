import Button from "./Button";

const Contacts = (props) => {
  console.log("props :", props.filteredContacts);
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {props.filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <Button
              onClick={props.deleteContact}
              name={contact.name}
              text="Delete"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
