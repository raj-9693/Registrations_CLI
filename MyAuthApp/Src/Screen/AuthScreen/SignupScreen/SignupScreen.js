import { KeyboardAvoidingView, ScrollView,
   ImageBackground,useWindowDimensions,
    Text,Image ,View,TouchableOpacity,Platform,
    Alert} from 'react-native'
  import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import {CustomButton,CustomInput,CustomSnackbar,ErrorText} from '../../../Components'
import styles from './Styles'
import {Signup} from '../../../Api/AuthClients'


// Validation Schema
const validationSchema = yup.object().shape({
  firstName: yup
  .string()
  .trim()
  .matches(/^[A-Za-z\s]+$/, 'Please use letters only')
  .required('First Name is required'),

lastName: yup
  .string()
  .trim()
  .matches(/^[A-Za-z\s]+$/, 'Please use letters only')
  .required('Last Name is required'),

  email: yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  phoneNumber: yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9\-\(\)]{10,}$/, 'Please enter a valid phone number'),
});

const SignupScreen=({navigation})=> {
  const { width, height } = useWindowDimensions();
  // const [isLoading, setIsLoading] = useState(false);

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


  // Handle Signup with Formik
  const handleSignup = async (values , {setSubmitting}) => {
    
    try {
      const SignupPayload = {
        firstName: values.firstName,       
        lastName: values.lastName,     
        email: values.email,           
        password: values.password,     
        phoneNumber: values.phoneNumber,   
      };

      const response = await Signup(SignupPayload)
      console.log(`server response Status ${response.data.message}  [Statuscode] ${response.status}` );
      if(response.data.success){
       showsnackbar(response?.data?.message || 'Success full' )
         setTimeout(() => {
         navigation.navigate('Login');
        }, 2500);   
         }
      
      

    } catch(err) {
      const message=err.response?.data?.message || err.message || 'Signup Failds'
       showsnackbar(message, 'error')
        setisLoading(false);
    }
    finally {
            setSubmitting(false);
        }
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignup}
    >
      {({ values, errors, touched,isSubmitting, handleChange, handleBlur, handleSubmit }) => (
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
                  onPress={() => navigation.goBack()}
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
                   keyboardType="default"
                   value={values.firstName}
                   onChangeText={handleChange('firstName')}
                   onBlur={handleBlur('firstName')}
                 />
                 <ErrorText error={errors.firstName} touched={touched.firstName}></ErrorText>

                 {/* {errors.firstName && touched.firstName && (
                   <Text style={{color: 'red', fontSize: 12, marginTop: -10}}>
                     {errors.firstName}
                   </Text>
                 )} */}

                </View >
                 
                  <View style={{flex:1}}>
                 <CustomInput
                  label="Last Name"
                  placeholder="Becket"
                  keyboardType="default"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />
                <ErrorText error={errors.lastName} touched={touched.lastName}></ErrorText>
                  </View>
                 
                </View>
              

                <CustomInput
                  label="Email"
                  placeholder="Loisbecket@gmail.com"
                   keyboardType="email-address"
                   value={values.email}
                   onChangeText={handleChange('email')}
                   onBlur={handleBlur('email')}
                />
                <ErrorText error={errors.email} touched={touched.email}></ErrorText>

                  <CustomInput
                  label="Password"
                  placeholder="********"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
               <ErrorText error={errors.password} touched={touched.password}></ErrorText>

                  <CustomInput
                  label="Phone Number"
                  placeholder="(454) 762-0592"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                /> 
                <ErrorText error={errors.phoneNumber} touched={touched.phoneNumber}></ErrorText>
                        
            </View>
            </ScrollView>
                     <CustomSnackbar
                     visible={snackbar.visible}
                     message={snackbar.message}
                     type={snackbar.type}
                     onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
                     duration={3000}
                     trigger={snackbar.trigger}
                       bottomOffset={100}

                    />

                    

              <View style={styles.buttonWrapper}>
               <CustomButton 
                onPress={handleSubmit}
                title="Register"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              />  
                </View>

             
                
               </KeyboardAvoidingView>
               </SafeAreaView>
      )}
    </Formik>
  )
}
export default SignupScreen;