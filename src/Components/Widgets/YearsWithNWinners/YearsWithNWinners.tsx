import React, { useState, useEffect } from 'react'
import { Text, DataTable } from 'react-native-paper'

import { useFetch } from 'src/Helpers/HttpClient'

const YearsWithNWinners = () => {
  const [years, setYears] = useState([])

  const { response } = useFetch({
    url: '/?projection=years-with-multiple-winners'
  })

  useEffect(() => {
    if (response?.years) setYears(response.years)
  }, [response])

  return (
    <>
      <Text variant="titleMedium" style={{ marginBottom: 8 }}>
        List years with multiple winners
      </Text>
      {years && years?.length > 0 && (
        <DataTable style={{ backgroundColor: '#ecdeff', borderRadius: 10, marginBottom: 18 }}>
          <DataTable.Header
            style={{
              backgroundColor: '#c7aeeb',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <DataTable.Title textStyle={{ fontWeight: 'bold' }}>Year</DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Win Count
            </DataTable.Title>
          </DataTable.Header>
          {years.map(({ year, winnerCount }) => (
            <DataTable.Row key={year}>
              <DataTable.Cell>{year}</DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'center' }}>{winnerCount}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </>
  )
}

export default YearsWithNWinners
