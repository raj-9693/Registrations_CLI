import { View, Text, KeyboardAvoidingView, TouchableOpacity,
  ImageBackground,Image,StyleSheet,ScrollView ,useWindowDimensions} from 'react-native'
import React from 'react'
import CustomButton from '../../../Components/CustomButton'
import CustomInput from '../../../Components/CustomInput'

const ForgotPasswordScreen=({navigation})=> {
   
  const { width, height } = useWindowDimensions();
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
            />
            <CustomButton 
            onPress={()=>navigation.navigate('Otp')}
            title="Send Reset Link" />

              </View>


              <View>
                <TouchableOpacity style={styles.BacktosignDesion}>
                  <Text style={styles.BacktosignText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>

            </View>

            </ScrollView>
            </KeyboardAvoidingView>
  )
}
export default ForgotPasswordScreen; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f6',
  },
  Content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'space-between',
    flex: 1, 
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 26,
  },
  logoIcon: {
    width: 18,
    height: 18,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 14,
  },
   subTitleText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  BacktosignText:{
    fontSize:18,
    color: '#3B82F6',
    fontWeight: '700',
    
  },
  BacktosignDesion:{
    alignItems:'center',
    marginBottom:1,
  }

})