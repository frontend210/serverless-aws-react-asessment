import useSWR from 'swr'

const fetcher = async (...args) => {
  const res = await fetch(...args)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export function useUsers() {
  const { data, error } = useSWR(`http://localhost:3000/users`, fetcher)

  return {
    users: data?.Items || [],
    isLoading: !error && !data,
    isError: error
  }
}

export async function createUser(id = null, firstName, lastName, email) {
  const body = {
    id: id || (new Date()).getTime().toString(),
    firstName,
    lastName,
    email,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(`http://localhost:3000/users`, options)

  if (!res.ok) {
    const error = new Error('An error occurred while creating the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}


export async function deleteUser(id) {
  const options = {
    method: 'DELETE',
  };

  const res = await fetch(`http://localhost:3000/users/${id}`, options)

  if (!res.ok) {
    const error = new Error('An error occurred while deleting the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}
