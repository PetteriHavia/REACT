import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';


const App = () => (
  <div>
    <h1>Pokemon REST-API with REACT</h1>
    <img className ="img" src="imageBanner.png" alt="BannerImg" />
  </div>

);

ReactDOM.render(<App />, document.getElementById("root"));

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
              <label>Search By ObjectID: </label>
              <input
                type="query"
                className="form-control"
                id="query"
                placeholder="Enter pokemon ID example: 5e9c425c2bb02b0a242ea8e8"
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
  ReactDOM.render(<SearchBar />, document.getElementById("rootSecond"));


  const GetPokemonData = () => {
    fetch("https://projectrestapi.herokuapp.com/api/getAll")
    .then((results) => {
      if (results.ok) {
        return results.json();
      }else{
          throw new Error('There was an error');
      }
    })
    .then((data) => {
      console.log(data);
      const items = data;
      ReactDOM.render(<PokemonArray data={items} />,
        document.getElementById("rootSecond")
      );
    });
    return <div>Fetching data...</div>;
  };


  // Toimii hieman sekavasti sillä hakukenttä etsii nyt pokemonin
  // ObjectID:n perusteella nimen sijaan. Esimerkki ID: 5e9c425c2bb02b0a242ea8e8
  const GetOnePokemon = (query) => {
    fetch("https://projectrestapi.herokuapp.com/api/get/" + query)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log("Haun tulokset", data);
      const items = data;
      console.log("One Pokemon: ", data);

      ReactDOM.render(<PokemonArray data={items} />,
        document.getElementById("rootSecond")
      );
    });
    return <div>Fetching data...</div>;
  };


const PokemonArray = (props) => {
  const { data } =  props;

  return (
    <div>
     <SearchBar />
      <table className="table table-striped table-bordered">
        <thead>
          <tr key={props.id}>
            <th scope="col">Pokedex</th>
            <th scope="col">Name</th>
            <th scope="col">Japanese Name</th>
            <th scope="col">Type</th>
            <th scope="col">ObjectID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr>
              <td key={i}> {item.pokedex} </td>
              <td> {item.name} </td>
              <td> {item.jname} </td>
              <td> {item.type} </td>
              <td> {item._id} </td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA






