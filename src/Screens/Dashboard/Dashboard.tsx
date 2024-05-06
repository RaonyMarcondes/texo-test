import React from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MoviesWonPerYear from '../../Components/Widgets/MoviesWonPerYear/MoviesWonPerYear'
import ProducersWithIntervals from '../../Components/Widgets/ProducersWithIntervals/ProducersWithIntervals'
import StudiosWithNWins from '../../Components/Widgets/StudiosWithNWins/StudiosWithNWins'
import YearsWithNWinners from '../../Components/Widgets/YearsWithNWinners/YearsWithNWinners'

const Dashboard = () => (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <YearsWithNWinners />
        <StudiosWithNWins />
        <ProducersWithIntervals />
        <MoviesWonPerYear />
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
)

export default Dashboard
