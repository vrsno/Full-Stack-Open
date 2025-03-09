export const PersonForm = ({
  handleNameChange,
  handleSubmit,
  handleNumberChange,
  newName,
  number,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input required value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input required value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
