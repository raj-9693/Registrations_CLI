import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import {NumberContext} from '../../../Context/NumberContext'

const CardScreen = () => {

  const { count,Anser} = useContext(NumberContext)
  return (
    <View>
      <Text>Number= {count}</Text>
       <Text>Anser= {Anser}</Text>
    </View>
  )
}

export default CardScreen