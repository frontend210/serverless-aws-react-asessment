import { useHistory } from "react-router-dom";
import { useSWRConfig } from "swr";
import { createUser, deleteUser, useUsers } from "../hooks/useUsers";

export default function ListPage() {
  const { mutate } = useSWRConfig();
  const { users, isLoading } = useUsers();

  const history = useHistory();

  function goToDetailFn() {
    history.push(`/edit/${this.id}`);
  }

  const createUserFn = async () => {
    await createUser(null, 'Ke1', 'Li1', 'sr.frontenddev210@gmail.com');
    mutate('http://localhost:3000/users');
  };

  async function deleteUserFn() {
    await deleteUser(this.id);
    mutate('http://localhost:3000/users');
  }

  if (isLoading) return <span>loading ...</span>;

  return (
    <div className="App-content">
      <div>
        <h2>{users.length} Users found</h2>
        <button onClick={createUserFn}>Add new user</button>
      </div>

      <ol>
        {users.map(user => {
          return (
            <li key={user.id}>
              <span>{user.firstName} {user.lastName}, {user.email}</span>

              <button
                onClick={deleteUserFn.bind(user)}
                className="float-right"
              >Delete</button>

              <button
                onClick={goToDetailFn.bind(user)}
                className="float-right mr-1"
              >Edit</button>
            </li>
          )
        })}
      </ol>
    </div>
  );
}
