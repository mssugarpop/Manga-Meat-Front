import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Navigation from './nav'

import CharIndex from './character/index/index.js';
import CharCreate from './character/create/create.js';
import CharDelete from './character/delete/delete.js';
import CharEdit from './character/edit/edit.js';

import FoodIndex from './food/index/index.js';
import CreateFood from './food/create/create.js';
import EditFood from './food/edit/edit.js';
import DeleteFood from './food/delete/delete.js';

// import TestComp from './test-component/test-comp'

class App extends Component {

  constructor() {
    super()
    this.state = {
      characters: [],
      food: [],
      currentPage: "",
      charToDelete: "", // an object from child component state
      foodToDelete: "", // an object from child component state
      charToName: "",
      foodToName: "",
      charToEdit: {},
      foodToEdit: {}
    }
  }

  getAllCharacters = () => {
    // console.log("Getting all characters...")
    const requestOptions = {
      method: "GET"
    }
    fetch('https://manga-meat-back.herokuapp.com/character', requestOptions)
      .then(resp => resp.json())
      .then(characters => {
        this.setState({ characters: characters })
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  handleCreateCharacter = (data) => {
    const { Name, School } = data
    const newCharacter = { Name, School }
    fetch('https://manga-meat-back.herokuapp.com/character', //local HOST FOR TESTINGGG
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCharacter)
      }).then(response => response.json())
      .then(newCharacter => {
        // console.log(newCharacter)
        this.setState({ characters: [...this.state.characters, newCharacter], currentPage: "Index" })
      })
  }


  handleDeleteCharacter = (id) => {
    fetch('https://manga-meat-back.herokuapp.com/character/' + id,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(
        this.setState({ characters: [...this.state.characters].filter(characters => characters._id !== id ? characters : null), currentPage: "Index" })
      )
  }

  handleUpdateCharacter = (data) => {
    const { Name, Picture, School, Age, ID, _id } = data
    const updated = { Name, Picture, School, Age, ID, _id }
    fetch('https://manga-meat-back.herokuapp.com/character/' + _id,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated)
      }).then(response => response.json())
      .then(updatedChar => {
        this.setState({ characters: [...this.state.characters].map(characters => characters._id === updatedChar._id ? updatedChar : characters), currentPage: "Index" })
      })

  }


  getAllFood = () => {
    // console.log("Getting all food...")
    const requestOptions = {
      method: "GET"
    }
    fetch('https://manga-meat-back.herokuapp.com/food', requestOptions)
      .then(resp => resp.json())
      .then(food => {
        this.setState({ food: food })
      })
  }


  handleCreateFood = (data) => {
    const { _id, Ingredients, Name, Picture } = data
    const newFood = { _id, Ingredients, Name, Picture }
    fetch('https://manga-meat-back.herokuapp.com/food', //can use local host string for testing
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFood)
      }).then(response => response.json())
      .then(newFood => {
        // console.log(newFood)
        this.setState({ food: [...this.state.food, newFood], currentPage: "Index" })
      })
  }

  handleUpdateFood = (data) => {
    const { _id, Ingredients, Name, Picture } = data
    const updated = { _id, Ingredients, Name, Picture }
    fetch('https://manga-meat-back.herokuapp.com/food/' + _id,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated)
      }).then(response => response.json())
      .then(updatedFood => {
        this.setState({ food: [...this.state.food].map(food => food._id === updatedFood._id ? updatedFood : food), currentPage: "Index" })
      })

  }

  handleDeleteFood = (id) => {
    fetch('https://manga-meat-back.herokuapp.com/food/' + id,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(
        this.setState({ food: [...this.state.food].filter(food => food._id !== id ? food : null), currentPage: "Index" })
      )
  }


  componentDidMount() {
    this.getAllCharacters()
    this.getAllFood()
  }

  setDetail = (data, name) => {
    // console.log("Somethung", data, name)
    this.setState({ charToDelete: data,  charToName: name, charToEdit: data})
  }

  setFoodDetail = (data, name) => {
    // console.log("Somethung", data)
    this.setState({ foodToDelete: data, foodToName: name, foodToEdit: data })
  }

  render() {
    // let currentCharacter = this.state.characters;
    // console.log(this.state.charToEdit)
    // console.log(this.state.food)

    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to MangaMeat Kitchen</h1>
          <p>Meat our chefs or check out the menu!</p>
        </header>
        <nav>
          <Navigation />
        </nav>
        <Switch>
          <Route path="/characters" render={() =>
            <>
              <h1>Chefs</h1>
              <CharIndex currentCharacter={this.state.characters} setDetail={ this.setDetail} />
              <div className="crud">
                <CharCreate create={this.handleCreateCharacter} />
                <CharEdit edit={this.handleUpdateCharacter} data={this.state.charToEdit} />
                <CharDelete delete={this.handleDeleteCharacter} data={this.state.charToDelete} name={this.state.charToName} />
              </div>
            </>
          } />
          <Route path="/food" render={() =>
            <>
              <h1>Menu</h1>
              <FoodIndex currentFood={this.state.food} setFoodDetail={ this.setFoodDetail} />
              <div className="crud">
                <CreateFood create={this.handleCreateFood} />
                <EditFood edit={this.handleUpdateFood} data={this.state.foodToEdit} />
                <DeleteFood delete={this.handleDeleteFood} data={this.state.foodToDelete} name={this.state.foodToName} />
              </div>
            </>
          } />
        </Switch>
      </div>
    )
  }
}

export default App;
