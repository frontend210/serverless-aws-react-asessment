import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useUsers(id = '') {
  const { data, error } = useSWR(`http://localhost:3000/users/${id}`, fetcher)

  return {
    users: data.Items,
    isLoading: !error && !data,
    isError: error
  }
}
