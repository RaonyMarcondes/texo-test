import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Text, DataTable } from 'react-native-paper'
import { BASE_URL } from '@env'

const ProducersWithIntervals = () => {
  const [minInterval, setMinInterval] = useState({})
  const [maxInterval, setMaxInterval] = useState({})

  useEffect(() => {
    fetch(`${BASE_URL}/?projection=max-min-win-interval-for-producers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Unable to retrieve the list')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setMinInterval(data.min[0])
        setMaxInterval(data.max[0])
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Text variant="titleMedium" style={{ maxWidth: '80%', marginBottom: 8 }}>
        Producers with Longest and Shortest Interval Between Wins
      </Text>

      <Text variant="titleSmall" style={{ marginBottom: 8 }}>
        MAXIMUN
      </Text>
      {maxInterval && (
        <DataTable style={{ backgroundColor: '#ecdeff', borderRadius: 10, marginBottom: 18 }}>
          <DataTable.Header
            style={{
              backgroundColor: '#c7aeeb',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <DataTable.Title textStyle={{ fontWeight: 'bold' }}>Producer</DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Interval
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Previous Win
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Following Win
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{maxInterval.producer}</DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {maxInterval.interval}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {maxInterval.previousWin}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {maxInterval.followingWin}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      )}

      <Text variant="titleSmall" style={{ marginBottom: 8 }}>
        MINIMUN
      </Text>
      {minInterval && (
        <DataTable style={{ backgroundColor: '#ecdeff', borderRadius: 10, marginBottom: 18 }}>
          <DataTable.Header
            style={{
              backgroundColor: '#c7aeeb',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <DataTable.Title textStyle={{ fontWeight: 'bold' }}>Producer</DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Interval
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Previous Win
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Following Win
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{minInterval.producer}</DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {minInterval.interval}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {minInterval.previousWin}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {minInterval.followingWin}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      )}
    </>
  )
}

export default ProducersWithIntervals
