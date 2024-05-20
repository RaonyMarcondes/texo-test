import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { Icon } from 'react-native-paper'

import Dashboard from './Screens/Dashboard/Dashboard'
import MoviesList from './Screens/MoviesList/MoviesList'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarActiveTintColor: '#8e7ab6',
            tabBarIcon: ({ color, size }) => (
              <Icon source="view-dashboard" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Movies"
          component={MoviesList}
          options={{
            headerTitle: 'List Movies',
            tabBarActiveTintColor: '#8e7ab6',
            tabBarIcon: ({ color, size }) => <Icon source="movie-star" size={size} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
