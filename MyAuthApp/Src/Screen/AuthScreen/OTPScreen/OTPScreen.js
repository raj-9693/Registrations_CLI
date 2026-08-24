import { Text, View,
  useWindowDimensions,Image,ImageBackground,TouchableOpacity,
  KeyboardAvoidingView,Platform,
  ScrollView} from 'react-native'
  
  import {CustomButton,OTPInput,CustomSnackbar} from '../../../Components';
 
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Styles';
import { ForgotPassword, OTP } from '../../../Api/AuthClients';


const OTPScreen=({navigation,route})=>{
  const { width, height } = useWindowDimensions();
  const {email}=route?.params || {}
  const[Loading ,setLoading]=useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(5 * 60)
   const [otp, setOtp] = useState(''); 
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'success',
    trigger: 0,
  });

  const showsnackbar = (message, type = 'success') => {
    setSnackbar(prev => ({
      visible: true,
      message,
      type,
      trigger: (prev.trigger || 0) + 1,
    }));
  };

  useEffect(() => {
    if (remainingSeconds === 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setRemainingSeconds(seconds => Math.max(seconds - 1, 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [remainingSeconds])

  const formattedTime = `${String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:${String(remainingSeconds % 60).padStart(2, '0')}`

  const handleResendCode = async () => {
    if (resendLoading || !email) {
      return;
    }

    setResendLoading(true)
    try {
      const response = await ForgotPassword({ email })
      setRemainingSeconds(5 * 60)
      showsnackbar(response.data?.message || 'A new OTP has been sent to your email')
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Unable to resend OTP.'
      showsnackbar(message, 'error')
      console.log('Resend OTP Error:', message)
    } finally {
      setResendLoading(false)
    }
  }


  const handleOtp=async()=>{
    if (remainingSeconds === 0) {
      return showsnackbar('OTP has expired. Please resend a new code.', 'error')
    }

    if(!otp.trim()){
      return showsnackbar('Place Enter 6-digit OTP !', 'error')
    }

   setLoading(true)
   try{
    const response= await OTP({otp,email})
    if(response.data.success){
       showsnackbar(response.data?.message )

         setTimeout(() => {
    navigation.navigate('RecreatePassword',{otp,email})
  }, 2000);  
}
    
    setLoading(false)
     console.log(response.data.message)
   }catch(err){
    setLoading(false)
    const message = err.response?.data?.message || err.message || 'Unable to verify OTP.'
    showsnackbar(message, 'error')
    console.log('OTP Error:', message)
   }

  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
       style={{ flex: 1 }}
       behavior={Platform.OS === 'ios' ? 'padding' : null}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
           <ScrollView 
             keyboardShouldPersistTaps="handled"
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{flexGrow:1,}} 
           >

      
    <View style={styles.container}>

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
           Enter Your Code
          </Text>

          {/* 3. Subtitle Row */}
          <View style={styles.subTitleRow}>
            <Text style={styles.subTitleText}>Please enter the 6-digit code send to your{'\n'}
              registered email address.  </Text>
           
          </View>


                </ImageBackground>




      <View  style={styles.Content}>
        <OTPInput 
       length={6}
       label="Verification Code"
       onCodeFilled={(code) => setOtp(code)}  
      
/>
  <Text style={styles.timerText}>
    {remainingSeconds > 0 ? `Code expires in ${formattedTime}` : 'Code expired'}
  </Text>
  <TouchableOpacity
   style={styles.ResendText}
   onPress={handleResendCode}
   disabled={resendLoading}
  >
   <Text style={styles.ResendLink}>{resendLoading ? 'Sending...' : 'Resend Code'}</Text>
   </TouchableOpacity>

           

        </View>
           </View>
     </ScrollView>
             
             <View style={{paddingHorizontal:24,paddingBottom:12}}>

             
        
             <CustomButton 
            onPress={handleOtp}
            title="Verify"
            isLoading={Loading}
            disabled={Loading}
             />

             <CustomSnackbar
               visible={snackbar.visible}
               message={snackbar.message}
               type={snackbar.type}
               onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
               duration={3000}
               trigger={snackbar.trigger}
               bottomOffset={100}
             />
            
               <Text style={styles.disclaimerText}> Didn't receive the code?{' '}
                
  <Text 
    style={styles.supportLink} 
    onPress={() => console.log('Support Link Clicked')}
  >
    Try Again.
  </Text>
</Text>

</View>
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default OTPScreen;