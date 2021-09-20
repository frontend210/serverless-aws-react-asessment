import { useUsers } from './api';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

function HomePage() {
  return <div>
    <Navbar />
    <Content />
  </div>
}

function Navbar() {
  return <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Hello, I am Ke Li, Welcome to my assessment test page!
      </p>
    </header>
  </div>
}

function Content() {
  const { users, isLoading } = useUsers()
  if (isLoading) return <Spinner />
  return (
    <div>
      <h2>{users.length} Users found</h2>
      <ol>
        {users.map(user => {
          return (
            <li key={user.id}>
              {user.firstName} {user.lastName}, {user.email}
            </li>
          )
        })}
      </ol>
    </div>

  )
}

function Spinner() {
  return <div>
    <span>loading ...</span>
  </div>
}

export default App;
