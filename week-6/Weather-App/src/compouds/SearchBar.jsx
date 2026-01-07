// src/components/SearchBar.jsx
const SearchBar = ({ city, setCity, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button 
        className="btn btn-primary" 
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;