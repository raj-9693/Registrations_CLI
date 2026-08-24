import { KeyboardAvoidingView, Text, View,Platform, ScrollView, 
  TouchableOpacity,Image,ImageBackground,useWindowDimensions} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import {CustomButton, CustomInput,CustomSnackbar,ErrorText} from '../../../Components'

import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles'
import {RecreatePassword} from '../../../Api/AuthClients'

const validationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
})

const RecreatePasswordScreen=({navigation, route})=> {
  const { width, height } = useWindowDimensions();
 const { otp, email} = route?.params || {};
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

  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const response = await RecreatePassword({ email, otp, newPassword: values.newPassword, });

      if (response.data.success) {
        showsnackbar(response.data.message || 'Password reset successfully.');
        setTimeout(() => navigation.navigate('Login'), 1000);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
      showsnackbar(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

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




            <Formik
              initialValues={{
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleResetPassword}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <View style={styles.Content}>
                  <CustomInput
                    label="New password"
                    placeholder="Enter your new password"
                    keyboardType="default"
                    secureTextEntry={true}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                  />
                  <ErrorText error={errors.newPassword} touched={touched.newPassword} />

                  <CustomInput
                    label="Confirm password"
                    placeholder="Confirm your new password"
                    keyboardType="default"
                    secureTextEntry={true}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  <ErrorText error={errors.confirmPassword} touched={touched.confirmPassword} />

                  <CustomButton
                    onPress={handleSubmit}
                    title="Set New Password"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />
                </View>
              )}
            </Formik>
           </View>
     </ScrollView>
             
             <View style={{paddingHorizontal:24,paddingBottom:12}}>

             
        
               <Text style={styles.disclaimerText}> Need help?{' '}
                
  <Text 
    style={styles.supportLink} 
    onPress={() => console.log('Support Link Clicked')}
  >
    Contact support.
  </Text>
</Text>

</View>

      <CustomSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
        duration={3000}
        trigger={snackbar.trigger}
        bottomOffset={100}
      />
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default RecreatePasswordScreen;