import React, { useState, useEffect } from 'react'
import { Text, DataTable, Searchbar } from 'react-native-paper'

import { useFetch } from 'src/Helpers/HttpClient'

const MoviesWonPerYear = () => {
  const [data, setData] = useState({})
  const [year, setYear] = useState('0000')
  const [searchYear, setSearchYear] = useState('')
  const [isValid, setIsValid] = useState(true)
  const { response, fetchData } = useFetch({
    url: `/?winner=true&year=${year}`
  })

  useEffect(() => {
    if (response) {
      setData(response)
    }
  }, [response])

  useEffect(() => {
    const trimmedYear = year.trim()
    if (trimmedYear === '') {
      setYear('0000')
      return
    }

    if (!isValid) {
      return
    }

    fetchData()
  }, [year, isValid])

  const validateYear = (query) => {
    return /^\d{4}$/.test(query)
  }

  const handleSubmit = () => {
    setIsValid(validateYear(searchYear))
    setYear(searchYear)
  }

  const clearYear = () => {
    setYear('0000')
    setSearchYear('')
    setIsValid(true)
    setData({})
  }

  return (
    <>
      <Text variant="titleMedium" style={{ maxWidth: '80%', marginBottom: 8 }}>
        List movie winners by year
      </Text>

      <>
        <Searchbar
          key={'input-year'}
          keyboardType="numeric"
          maxLength={4}
          placeholder="Search by year"
          onChangeText={(value) => {
            setSearchYear(value)
            setIsValid(true)
          }}
          value={searchYear}
          onSubmitEditing={handleSubmit}
          onBlur={handleSubmit}
          onClearIconPress={() => clearYear()}
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

        {data?.length ? (
          data.map(({ id, year, title }) => (
            <DataTable.Row key={title}>
              <DataTable.Cell>{id}</DataTable.Cell>
              <DataTable.Cell>{year}</DataTable.Cell>
              <DataTable.Cell>{title}</DataTable.Cell>
            </DataTable.Row>
          ))
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
