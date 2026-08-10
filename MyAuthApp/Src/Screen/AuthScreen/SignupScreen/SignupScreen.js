import { KeyboardAvoidingView, ScrollView,
   ImageBackground,useWindowDimensions,
    Text,Image ,View,TouchableOpacity,Platform} from 'react-native'
  import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import CustomButton from '../../../Components/CustomButton'
import CustomInput from '../../../Components/CustomInput'
import styles from './Styles'


const SignupScreen=({navigation})=> {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={{flex:1}}> 
       <KeyboardAvoidingView
         style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
       >
         
         <ScrollView
           keyboardShouldPersistTaps="handled"
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.container} 
         >
           {/* // Imagebackground-code */}
           <ImageBackground
             source={require('../../../Assets/Image/Head.png')}
             style={{ 
               width: width, 
               height: height * 0.25,
               paddingHorizontal: 24, 
               paddingVertical: 24,       
             }}
             resizeMode="cover"
           >
             
                    {/* //<- logo */}
             <Image 
               source={require('../../../Assets/Image/Aro.png')}
               style={styles.logoIcon}
               resizeMode="contain"
                        />
                       {/* // Heading */}
            <Text style={styles.headingText}>Register</Text>
                              {/* //SubtitleRow */}
                       <View style={styles.subTitleRow}>
                        <Text style={styles.subTitleText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                          <Text style={styles.signUpLink}>Log In</Text>
                        </TouchableOpacity>
                      </View>

           </ImageBackground>


      <View style={styles.Content}>
           
              <View style={styles.CustomInputBox}>
            <View style={{flex:1}}>
             <CustomInput
              label="First Name"
              placeholder="Lais"
              keyboardType="email-address"
            />
            </View >
             
              <View style={{flex:1}}>
             <CustomInput
              label="Last Name"
              placeholder="Becket"
              keyboardType="email-address"
            />
              </View>
             
            </View>
          

            <CustomInput
              label="Email"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
            />

              <CustomInput
              label="Birth of Date"
              placeholder="18/03/2002"
              keyboardType="email-address"
            />
              <CustomInput
              label="Phone Number"
              placeholder="(454) 762-0592"
              keyboardType="email-address"
            /> 
             

             
                   
</View>
</ScrollView>

          <View style={styles.buttonWrapper}>
           <CustomButton 
            onPress={()=>{navigation.navigate('ForgotPassword')}}
            title="Register" />  
            </View>

         
            
           </KeyboardAvoidingView>
           </SafeAreaView>
  )
}
export default SignupScreen;