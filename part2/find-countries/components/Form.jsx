export const Form = ({ country, handleCountryChange }) => {
  return (
    <div>
      <p>Find country</p>
      <input type="text" value={country} onChange={handleCountryChange} />
    </div>
  );
};
