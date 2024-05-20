import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Text, DataTable } from 'react-native-paper'

import { useFetch } from 'src/Helpers/HttpClient'

const ProducersWithIntervals = () => {
  const [minInterval, setMinInterval] = useState({})
  const [maxInterval, setMaxInterval] = useState({})

  const { response } = useFetch({
    url: '/?projection=max-min-win-interval-for-producers'
  })

  useEffect(() => {
    if (response?.min[0]) setMinInterval(response.min[0])

    if (response?.max[0]) setMaxInterval(response.max[0])
  }, [response])

  return (
    <>
      <Text variant="titleMedium" style={{ maxWidth: '80%', marginBottom: 8 }}>
        Producers with longest and shortest interval between wins
      </Text>

      <Text variant="titleSmall" style={{ marginBottom: 8 }}>
        Maximum
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
        Minimum
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
              Previous Year
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold' }}
              style={{ justifyContent: 'center' }}
            >
              Following Year
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
