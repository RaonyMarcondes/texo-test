import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Text, DataTable } from 'react-native-paper'
import { BASE_URL } from '@env'

const StudiosWithNWins = () => {
  const [studios, setStudios] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/?projection=studios-with-win-count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Unable to retrieve the list')
        }
        return response.json()
      })
      .then((data) => setStudios(data.studios))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Text variant="titleMedium" style={{ marginBottom: 8 }}>
        Top 3 Studios with Winners
      </Text>
      {studios && studios?.length > 0 && (
        <ScrollView>
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
            {studios.slice(0, 3).map(({ name, winCount }) => (
              <DataTable.Row key={name}>
                <DataTable.Cell>{name}</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>{winCount}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      )}
    </>
  )
}

export default StudiosWithNWins
