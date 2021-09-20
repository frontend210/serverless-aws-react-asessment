import { useUsers, createUser, deleteUser } from './api';
import logo from './logo.svg';
import './App.css';
import { useSWRConfig } from 'swr'

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
  return <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Hello, I am Ke Li, Welcome to my assessment page!
    </p>
  </header>
}

function Content() {
  const { mutate } = useSWRConfig()
  const { users, isLoading } = useUsers()

  if (isLoading) return <Spinner />
  return (
    <div className="App-content">
      <div>
        <h2>{users.length} Users found</h2>
        <button onClick={async () => {
          // TODO: create a separate page for create, update
          await createUser('Ke1', 'Li1', 'sr.frontenddev210@gmail.com')
          mutate('http://localhost:3000/users')
        }}>Add new user</button>
      </div>

      <ol>
        {users.map(user => {
          return (
            <li key={user.id}>
              <span>{user.firstName} {user.lastName}, {user.email}</span>

              <button
                onClick={async () => {
                  await createUser(user.id)
                  mutate('http://localhost:3000/users')
                }}
                className="float-right"
              >Edit</button>

              <button
                onClick={async () => {
                  await deleteUser(user.id)
                  mutate('http://localhost:3000/users')
                }}
                className="float-right"
              >Delete</button>
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
