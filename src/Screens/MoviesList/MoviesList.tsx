import { CheckBox, Dialog } from '@rneui/themed'
import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { DataTable, Icon, Searchbar, Text } from 'react-native-paper'
import { BASE_URL } from '@env'

const MoviesList = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = React.useState<number>(0)
  const [year, setYear] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [filterByYear, setFilterByYear] = useState(false)
  const [winner, setWinner] = useState(false)
  const itemsPerPage = 12
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const [totalPages, setTotalPages] = React.useState<number>(0)

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, totalElements)

  useEffect(() => {
    let url = BASE_URL

    url += `?page=${page}&size=${itemsPerPage}`

    if (year) {
      url += `?year=${year}`
    }

    if (winner) {
      url += `&winner=${winner}`
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Unable to retrieve the movies list')
        }
        return response.json()
      })
      .then((data) => {
        setMovies(data.content)
        setPagination(data.totalElements, data.totalPages)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [page, year, winner])

  const setPagination = (totalElements, totalPages) => {
    setTotalElements(totalElements)
    setTotalPages(totalPages)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
        {movies && movies?.length > 0 && (
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text variant="titleMedium" style={{ marginBottom: 3 }}>
                Filter by:
              </Text>
              <View
                style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <CheckBox
                  checked={winner}
                  onPress={() => setWinner(!winner)}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  title="Winner"
                  checkedColor="#8e7ab6"
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
              <View
                style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <CheckBox
                  checked={filterByYear}
                  onPress={() => setFilterByYear(!filterByYear)}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  title="Year"
                  checkedColor="#8e7ab6"
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
            </View>
            {filterByYear && (
              <Searchbar
                key={'input-year'}
                keyboardType="numeric"
                maxLength={4}
                placeholder="Year"
                onChangeText={(value) => {
                  setSearchYear(value)
                }}
                value={searchYear}
                onSubmitEditing={() => setShowDialog(true)}
                onBlur={() => setShowDialog(true)}
                onIconPress={() => {
                  setSearchYear('')
                }}
                style={{ marginBottom: 15 }}
              />
            )}

            <DataTable style={{ backgroundColor: '#ecdeff', borderRadius: 10, marginBottom: 18 }}>
              <DataTable.Header
                style={{
                  backgroundColor: '#c7aeeb',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10
                }}
              >
                <DataTable.Title textStyle={{ fontWeight: 'bold' }}># ID</DataTable.Title>
                <DataTable.Title style={{ flex: 3 }} textStyle={{ fontWeight: 'bold' }}>
                  Title
                </DataTable.Title>
                <DataTable.Title textStyle={{ fontWeight: 'bold' }}>Year</DataTable.Title>
                <DataTable.Title
                  style={{ justifyContent: 'center' }}
                  textStyle={{ fontWeight: 'bold' }}
                >
                  Winner
                </DataTable.Title>
              </DataTable.Header>
              {movies.map(({ id, title, year, winner }) => (
                <DataTable.Row key={id}>
                  <DataTable.Cell>{id}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 3 }}>{title}</DataTable.Cell>
                  <DataTable.Cell>{year}</DataTable.Cell>
                  <DataTable.Cell style={{ justifyContent: 'center' }}>
                    <Icon source={winner ? 'trophy' : ''} color="#dea300" size={20} />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
              <DataTable.Pagination
                page={page}
                numberOfPages={totalPages}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${totalElements}`}
                numberOfItemsPerPage={itemsPerPage}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
              />
            </DataTable>
          </ScrollView>
        )}
        <Dialog isVisible={showDialog} onBackdropPress={() => setShowDialog(false)}>
          <Dialog.Title title="Hello There!" />
          <Text>{`Sorry to ruin your experience, but there is a bug in the API that makes this date filter impossible to work! \n`}</Text>
          <Text>{`I explain this in detail in the project's READEME.md`}</Text>
        </Dialog>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default MoviesList
