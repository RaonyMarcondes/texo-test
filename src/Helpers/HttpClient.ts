import { useState, useEffect } from 'react'

const BASE_URL = 'https://tools.texoit.com/backend-java/api/movies'

export const useFetch = (params) => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}${params.url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params.body)
      })
      const data = await response.json()
      setResponse(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { response, error, loading, fetchData }
}
