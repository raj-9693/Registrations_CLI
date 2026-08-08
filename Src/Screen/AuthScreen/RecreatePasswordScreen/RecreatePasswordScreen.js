import { KeyboardAvoidingView, StyleSheet, Text, View,Platform, ScrollView, 
  TouchableOpacity,Image,ImageBackground,useWindowDimensions} from 'react-native'
import React from 'react'
import CustomButton from '../../../Components/CustomButton'
import CustomInput from '../../../Components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
SafeAreaView
const RecreatePasswordScreen=()=> {
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
            Recreate Password
          </Text>

          {/* 3. Subtitle Row */}
          <View style={styles.subTitleRow}>
            <Text style={styles.subTitleText}>Please enter a Strong new Password to secure your account </Text>
           
          </View>


                </ImageBackground>




      <View  style={styles.Content}>
             <CustomInput
              label=" New password"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"/>


             <CustomInput
              label=" New password"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"/>

        </View>
           </View>
     </ScrollView>
             
             <View style={{paddingHorizontal:24,paddingBottom:12}}>

             
        
             <CustomButton 
            onPress={()=>navigation.navigate('Signup')}
            title="set New Password" />
               <Text style={styles.disclaimerText}> Need help?{' '}
                
  <Text 
    style={styles.supportLink} 
    onPress={() => console.log('Support Link Clicked')}
  >
    Contact support.
  </Text>
</Text>

</View>
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default RecreatePasswordScreen;

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
  },
  container:{
    flex:1,
  },
  Content:{
    flex:1,
    paddingHorizontal:24,
    marginTop:24,
    
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
  subTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitleText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  signUpLink: {
    color: '#3B82F6', 
    fontSize: 14,
    fontWeight: '600',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  supportLink: {
    color: '#2563EB', // Blue link color
    fontWeight: '600',
  },
})