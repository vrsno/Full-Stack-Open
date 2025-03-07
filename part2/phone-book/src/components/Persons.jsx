export const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name}
          {""} {person.tel}
        </p>
      ))}
    </div>
  );
};
