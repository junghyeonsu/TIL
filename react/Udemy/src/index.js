import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const API_KEY = "AIzaSyA6Opq2IDLDdzs_e8GI9nckDAnwX-Q1_aA";

// Create a new Component , This Component should produce
// some HTML
const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />,document.querySelector('.container'));
