import SearchBar from "./SearchBar/SearchBar";
import Suggestion from "./Suggestion/Suggestion";

const SuggestionAndSearch = () => {
  return (
    <div>
      <div>
        <SearchBar></SearchBar>
        <Suggestion />
      </div>
    </div>
  );
};

export default SuggestionAndSearch;
