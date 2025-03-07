export const Filter = ({ showAll, handleFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} value={showAll} />
    </div>
  );
};

export default Filter;
