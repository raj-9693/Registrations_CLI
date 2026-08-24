import { View, Text, KeyboardAvoidingView, TouchableOpacity,
  ImageBackground,Image,ScrollView ,useWindowDimensions, Platform,
  Alert} from 'react-native'
import React, { useState } from 'react'

import {CustomButton , CustomInput ,CustomSnackbar} from '../../../Components'
import styles from './Styles'
import { ForgotPassword } from '../../../Api/AuthClients'

const ForgotPasswordScreen=({navigation})=> {
   
  const { width, height } = useWindowDimensions();
  const[email,setemail]=useState('')
  const[loading,setLoading]=useState(false)



const handalForgatpassword=async()=>{
  if(!email.trim()){
    return  showsnackbar('email is requied !' , 'error')
  }
  setLoading(true)

  try{
    const response=await ForgotPassword({email})
     if (response.data.success) {
      showsnackbar(response.data?.message || 'OTP Send your Email')

      setTimeout(() => {
   navigation.navigate('Otp',{email})
  }, 2000);   
     
    }

    console.log(response.data.message)
    console.log(response.status)
    setLoading(false)
    


  }catch(error){
    const message=error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
       showsnackbar(message, 'error')
      setLoading(false)
     console.log('Forgot Password Error:', message)
    
  }}


// Snackbar 
  const [snackbar, setSnackbar] = useState({visible:false, message:'',type:'success',trigger:0});
     const showsnackbar=(message,type='success')=>{
      setSnackbar(prev=>({
      visible:true,
      message,
      type,
      trigger: (prev.trigger || 0) +1,
      }))
     
     }

  return (
     <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* 👈 ScrollView: छोटे फोन में स्क्रीन स्क्रॉल हो सकेगी */}
          <ScrollView
            style={styles.container}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }} // 👈 स्क्रीन की पूरी हाइट बनाए रखने के लिए
          >
            {/* // Imagebackground-code */}
            <ImageBackground
              source={require('../../../Assets/Image/Head.png')}
              style={{ 
                width: width, 
                height: height * 0.3,
                paddingHorizontal: 24, 
                paddingVertical: 24,       
              }}
              resizeMode="cover"
            >
              {/* 1. Logo Row */}
                        <View style={styles.logoRow}>
                          <Image 
                            source={require('../../../Assets/Image/Vector.png')}
                            style={styles.logoIcon}
                            resizeMode="contain"
                          />
                           <Text style={styles.logoText}>Logoipsum</Text>
                          </View>
                       {/* 2. Heading */}
                              <Text style={styles.headingText}>
                                   Forgot your{'\n'}Password?
                                 </Text>
                                 {/* 3. Subtitle Row */}
                                 <Text style={styles.subTitleText}>Don't worry. Please enter your registered email 
                                  address,and we'll send you a link to reset your password.</Text>
            </ImageBackground>

            <View style={styles.Content}>

              <View>
              <CustomInput
              label="Email"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setemail}
            />
            <CustomButton 
            onPress={handalForgatpassword}
            title="Send Reset Link" 
            isLoading={loading}
            disabled={loading}
            />

              </View>
 
               
              <View>

                  
                <TouchableOpacity style={styles.BacktosignDesion} onPress={()=>navigation.navigate('Otp')}>
                  <Text style={styles.BacktosignText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>

            </View>


                 <CustomSnackbar
                 visible={snackbar.visible}
                 message={snackbar.message}
                 type={snackbar.type}
                 onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
                 duration={3000}
                 trigger={snackbar.trigger}
                  bottomOffset={100} />
            </ScrollView>
            </KeyboardAvoidingView>
  )
}
export default ForgotPasswordScreen;