import React from 'react';
import logo from './logo.svg';
import './App.css';

const useSemiPersistentState = (key, defaultValue) => {
  const [value, setValue] = React.useState(
    localStorage.getItem('value') || defaultValue
  );

  React.useEffect(() => {
    localStorage.setItem('value', value);
  }, [value]);

  return [value, setValue];
}

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>
        <strong>Search:</strong>
      </InputWithLabel>

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

      <hr />

      <List list={searchedStories}/>
    </div>
  );
}

const InputWithLabel = ({id, type="text", value, onChange, children}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} onChange={onChange} value={value}/>
  </>
);

const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);

export default App;
