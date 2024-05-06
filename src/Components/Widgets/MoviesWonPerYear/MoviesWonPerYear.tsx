import React, { useState, useEffect } from 'react'
import { Text, DataTable, Searchbar } from 'react-native-paper'
import { BASE_URL } from '@env'

const MoviesWonPerYear = () => {
  const [data, setData] = useState({})
  const [year, setYear] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (year.trim() === '') {
      setYear('')
      return
    }

    if (!isValid) {
      return
    }

    fetch(`${BASE_URL}/?winner=true&year=${year}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Unable to retrieve the list')
        }
        return response.json()
      })
      .then((data) => {
        setData(data[0])
      })
      .catch((error) => console.error(error))
  }, [year, isValid])

  const validateYear = (query) => {
    return /^\d{4}$/.test(query)
  }

  const handleSubmit = () => {
    setIsValid(validateYear(searchYear))
    setYear(searchYear)
  }

  return (
    <>
      <Text variant="titleMedium" style={{ maxWidth: '80%', marginBottom: 8 }}>
        Movies that Won per Year
      </Text>

      <>
        <Searchbar
          key={'input-year'}
          keyboardType="numeric"
          maxLength={4}
          placeholder="Year"
          onChangeText={(value) => {
            setSearchYear(value)
            setIsValid(true)
          }}
          value={searchYear}
          onSubmitEditing={handleSubmit}
          onBlur={handleSubmit}
          onIconPress={() => {
            setYear('0000')
            setSearchYear('')
          }}
        />
        {!isValid && <Text style={{ color: 'red' }}>Please enter a valid year.</Text>}
      </>

      <DataTable
        style={{ backgroundColor: '#ecdeff', borderRadius: 10, marginBottom: 18, marginTop: 15 }}
      >
        <DataTable.Header
          style={{
            backgroundColor: '#c7aeeb',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }}
        >
          <DataTable.Title textStyle={{ fontWeight: 'bold' }}># ID</DataTable.Title>
          <DataTable.Title textStyle={{ fontWeight: 'bold' }}>Year</DataTable.Title>
          <DataTable.Title textStyle={{ fontWeight: 'bold' }}>Title</DataTable.Title>
        </DataTable.Header>

        {data && data?.title ? (
          <DataTable.Row>
            <DataTable.Cell>{data.id}</DataTable.Cell>
            <DataTable.Cell>{data.year}</DataTable.Cell>
            <DataTable.Cell>{data.title}</DataTable.Cell>
          </DataTable.Row>
        ) : (
          <DataTable.Row>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              no results were found
            </DataTable.Cell>
          </DataTable.Row>
        )}
      </DataTable>
    </>
  )
}

export default MoviesWonPerYear
