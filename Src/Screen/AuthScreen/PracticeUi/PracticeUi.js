import { View, Text,StyleSheet, KeyboardAvoidingView ,Platform} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../Components/CustomButton'
import CustomInput from '../../../Components/CustomInput'



const PracticeUi = () => {
  return (
    <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>

                    

       <View style={{flex:1,backgroundColor:"#e4e452",paddingHorizontal:24,paddingTop:24,justifyContent:'space-between'}}>
          <View style={{}}>
           <CustomInput
              label="Email"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
            />
               <CustomInput
              label="Email"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
            />
               <CustomInput
              label="Email"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
            />
            <View style={styles.carddesion}>
 
           <View style={{flexDirection:'row',gap:8,marginBottom:10,alignItems:'center'}}>

            <View style={{backgroundColor:'#2d15e5',borderRadius:10 ,paddingHorizontal:8,paddingVertical:2}}>
                <Text style={{color:'#FFFFFF',fontSize:11,fontWeight:'700'}}>#1</Text>
            </View > 

            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:5}}>
                <View>
               <Text style={{padding:5}}>19/06/2026. 17:53</Text>
                </View>

                <View >
               <Text>😈👏🏻</Text>
            </View>

            </View>
           

            
            
           
                
            
           </View>


           <Text>You Asked:</Text>
           <Text>Hello I am Raj </Text>

           
            </View>

           


        </View>

        <View style={{marginBottom:20}}>
             <CustomButton 
            onPress={()=>navigation.navigate('Signup')}
            title="set New Password" />
         </View>
        
       </View>

 


        </KeyboardAvoidingView>
    
    
     </SafeAreaView>
  )
}

export default PracticeUi

const styles = StyleSheet.create({

    carddesion:{
        backgroundColor:'#FFFFFF',
        borderRadius:16,
        padding:16,
        shadowColor:'#000',

    }

})