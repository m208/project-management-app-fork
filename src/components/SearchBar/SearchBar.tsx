import { useState } from 'react';
import './SearchBar.pcss';

export function SearchBar () {
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const searchRequest = () => {
    setShowResults(prev=>!prev);
  };

  return (
    <div className="search-wrapper">
      <input
        type="search"
        className='search-input'
        placeholder='Search...'
        value={inputValue}
        onChange={e=>setInputValue(e.target.value)}
        onBlur={()=>setShowResults(false)}
        onKeyUp={e=>{if(e.code === 'Enter'){
          searchRequest();
        }}}

      />

      {showResults && (
        <div
          className="search-output"
        >

          <div className="search-header">
            <div className="results-board">board</div>
            <div className="results-col">column</div>
            <div className="results-task">task</div>
          </div>

          <div className="search-results">
            <div className="results-board">board</div>
            <div className="results-col">column</div>
            <div className="results-task">task</div>
          </div>

        </div>
      )}

    </div>
  );
}
