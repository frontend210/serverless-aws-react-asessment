import {useSWRConfig} from "swr";
import {createUser, deleteUser, useUsers} from "../hooks/useUsers";

export default function ListPage() {
  const { mutate } = useSWRConfig()
  const { users, isLoading } = useUsers()

  if (isLoading) return <span>loading ...</span>
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
                  await deleteUser(user.id)
                  mutate('http://localhost:3000/users')
                }}
                className="float-right"
              >Delete</button>

              <button
                onClick={async () => {
                  await createUser(user.id)
                  mutate('http://localhost:3000/users')
                }}
                className="float-right mr-1"
              >Edit</button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
