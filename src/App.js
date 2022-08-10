import CardList from './components/card-list/card-list.component'
import './App.css';
import { Component } from 'react';
import SearchBox from './components/search-box/search-box.components';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      this.setState({monsters: await res.json()})
    } catch (e) {
      console.error(e);
    }
  }


  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField }
    })
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => monster.name.toLocaleLowerCase().includes(this.state.searchField))
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox className='monsters-search-box' placeholder='search monsters' onChangeHandler={onSearchChange}></SearchBox>
        <CardList monsters={filteredMonsters}  />
      </div>
    );
  }
}

export default App;
