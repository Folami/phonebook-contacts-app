const ContactForm = (props) => {
  return (
    <form onSubmit={props.add}>
      <h2>Add New Contact</h2>
      <div>
        Name : <input value={props.name} onChange={props.handleName} />
      </div>
      <div>
        Number : <input value={props.number} onChange={props.handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default ContactForm;
