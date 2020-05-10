import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
//import App from './App';
//import * as serviceWorker from './serviceWorker';


const App = () => (
  <div>
    <h1>Pokemon REST-API</h1>
    <div className="Banner">
    <img src="imageBanner.png" alt="BannerImg" />
    </div>
    <div className="searchBar">
      <SearchBar />
    </div>
    <div className="infoTable">
      <GetPokemonData />
    </div>
  </div>

);


const SearchBar = () => {

  // Määritellään käsittelija napille 1 
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Tapahtuman aiheutti: ", event.target);
      var form = event.target;
      console.log("Hakusana: ", form.query.value);
      GetOnePokemon(form.query.value);
    };
    
    // Määritellään käsittelija napille 2 
    const handleClick = (event) => {
      event.preventDefault();
      console.log("Tapahtuman aiheutti: ", event.target);
      GetPokemonData();
    };
    // Komponentin palauttama JSX muotoinen esitys
    return (
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Search: </label>
              <input
                type="query"
                className="form-control"
                id="query"
                placeholder="Enter pokemon ID"
                name="query"
              />
            </div>
            <div className="form-group">
              <button type="submit" id="button1" className="btn btn-primary">
                Submit
              </button>
  
              <button
                type="button"
                className="btn btn-primary"
                onClick={ handleClick }
                >Get All
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  ReactDOM.render(<SearchBar />, document.getElementById("root"));


  const GetPokemonData = () => {
    fetch("https://projectrestapi.herokuapp.com/api/getAll")
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data);
      const items = data;

      ReactDOM.render(<PokemonArray data={items} />,
        document.getElementById("root")
      );
    });
    return <div>Nothing here. Fetching data...</div>;
  };


  // Toimii hieman sekavasti sillä hakukenttä etsii nyt pokemonnin
  // ObjectID:n perusteella nimen sijaan. Esimerkki ID: 5e9c425c2bb02b0a242ea8e8
  const GetOnePokemon = (id) => {
    fetch("https://projectrestapi.herokuapp.com/api/get/" + id)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log("Haun tulokset", data);
      const items = data;
      console.log("One Pokemon: ", data);

      ReactDOM.render(<PokemonArray data={items} />,
        document.getElementById("root")
      );
    });
    return <div>Nothing here. Fetching data...</div>;
  };


const PokemonArray = (props) => {
  const { data } =  props;

  return (
    <div>
      <SearchBar />
      <table className="table table-striped table-bordered">
        <thead>
          <tr key={props.id}>
            <th scope="col">Name</th>
            <th scope="col">Jname</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {data.pokemon.map((item, i) => (
            <tr>
              <td key={i}> {item.pokedex} </td>
              <td> {item.name} </td>
              <td> {item.jname} </td>
              <td> {item.type} </td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA






