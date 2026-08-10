import { Text, View,
  useWindowDimensions,Image,ImageBackground,TouchableOpacity,
  KeyboardAvoidingView,Platform,
  ScrollView} from 'react-native'
  import CustomInput from '../../../Components/CustomInput';
  import CustomButton from '../../../Components/CustomButton';
  import  OTPInput  from '../../../Components/OTPInput';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Styles';

const OTPScreen=({navigation})=>{
  const { width, height } = useWindowDimensions();
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
       onCodeFilled={(code) => console.log('Full code:', code)} 
/>
   <TouchableOpacity style={styles.ResendText}>
    <Text style={styles.ResendLink}> Resend Code</Text>
   </TouchableOpacity>

           

        </View>
           </View>
     </ScrollView>
             
             <View style={{paddingHorizontal:24,paddingBottom:12}}>

             
        
             <CustomButton 
            onPress={()=>navigation.navigate('RecreatePassword')}
            title="Verify" />
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