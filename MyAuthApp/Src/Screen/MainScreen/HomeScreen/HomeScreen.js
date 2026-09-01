import { View, Text, Button } from 'react-native';
import React, { useState, useContext } from 'react';
import { CustomButton, CustomInput } from '../../../Components';
import { AuthContext } from '../../../Context/AuthContext';
import {NumberContext} from '../../../Context/NumberContext'

const HomeScreen = ({navigation}) => {
  const [EvenNumber, EvensetNumber] = useState(0);
  // const [Resultss, setResultss]=useState('Not Result so')
  const { logout ,userDeta } = useContext(AuthContext);

const {count,setcount,Anser,setAnser} =useContext(NumberContext)
console.log('Count', count)

  

  
  return (
    <View style={{paddingHorizontal:24}}>
      <Button title='Logout' onPress={logout} />
      <Text>HomeScreen</Text>
      
    </View>
  );
};

export default HomeScreen;