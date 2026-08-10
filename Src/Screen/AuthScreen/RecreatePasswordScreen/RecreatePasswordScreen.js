import { KeyboardAvoidingView, Text, View,Platform, ScrollView, 
  TouchableOpacity,Image,ImageBackground,useWindowDimensions} from 'react-native'
import React from 'react'
import CustomButton from '../../../Components/CustomButton'
import CustomInput from '../../../Components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles'
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