import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useSWRConfig} from 'swr';
import {createUser, deleteUser, useUsers} from '../hooks/useUsers';

export default function DetailPage() {
  const {mutate} = useSWRConfig();
  const {users} = useUsers();

  const {userId} = useParams();
  const history = useHistory();
  const [user, setUser] = useState({firstName: '', lastName: '', email: ''});

  useEffect(() => {
    const currentUser = users.find(user => user.id === userId);
    setUser(currentUser);
  }, [userId, users]);

  function goToListFn() {
    history.goBack();
  }

  const updateUserFn = async () => {
    await createUser(userId, user.firstName, user.lastName, user.email);
    mutate('http://localhost:3000/users');
    goToListFn();
  };

  const deleteUserFn = async () => {
    await deleteUser(userId);
    mutate('http://localhost:3000/users');
    goToListFn();
  }

  return (
    <div className="App-content">
      <div>
        <h3>{user?.firstName} {user?.lastName}</h3>

        <form>
          <div className="mb-1">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={user?.firstName}
              onChange={(e) => {
                setUser({...user, firstName: e.target.value})
              }}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={user?.lastName}
              onChange={(e) => {
                setUser({...user, lastName: e.target.value})
              }}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={user?.email}
              onChange={(e) => {
                setUser({...user, email: e.target.value})
              }}
            />
          </div>
        </form>

        <button
          onClick={deleteUserFn}
          className="float-right"
        >Delete
        </button>

        <button
          onClick={updateUserFn}
          className="float-right mr-1"
        >Update
        </button>

        <button
          onClick={goToListFn}
          className="float-right mr-1"
        >Cancel
        </button>
      </div>
    </div>
  );
}
