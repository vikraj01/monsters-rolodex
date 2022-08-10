import CardList from './components/card-list/card-list.component'
import './App.css';
import SearchBox from './components/search-box/search-box.components';
import { useState, useEffect } from 'react';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters,setFilteredMonsters] = useState(monsters)

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
  }, []);

  useEffect(() => {
    const newfilteredMonsters = monsters.filter((monster) => monster.name.toLocaleLowerCase().includes(searchField))
    setFilteredMonsters(newfilteredMonsters)
  },[monsters,searchField])

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox className='monsters-search-box' placeholder='search monsters' onChangeHandler={onSearchChange}></SearchBox>
      <CardList monsters={filteredMonsters} />
    </div>
  )
}




export default App;
