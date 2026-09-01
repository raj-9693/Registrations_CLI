import { 
  Text, 
  View, 
  ImageBackground, 
  useWindowDimensions, 
  Image, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
 CustomInput,
  CustomButton,
  SocialButton,
  CustomSnackbar,
  ErrorText,
} from '../../../Components';

import styles from './Styles';

import { Login } from '../../../Api/AuthClients';
import { useContext } from 'react';
import {AuthContext} from '../../../Context/AuthContext'


// Validation Schema
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const { width, height } = useWindowDimensions();
  const [rememberMe, setRememberMe] = useState(false);

  const counterStates=useContext(AuthContext)
  console.log("Context",counterStates)

  const {login,setuserDeta} = useContext(AuthContext)
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

  


  const handleGoogleLogin = () => {
    console.log('Google Login Pressed');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login Pressed');
  };

  // Handle Login Submit
const handleLoginSubmit = async (values ,{setisSubmitting}) => {
    try {

    const LoginPlayload={
      email:values.email,
      password:values.password
    }
    const response=await Login(LoginPlayload)
    const Token = response.data?.data?.accessToken;
    console.log("Tocken",Token)
    if(Token){
      await login(Token)
    } 

    const MyDeta=response.data?.data
    console.log( 'All deta',response.data?.data)
    setuserDeta(MyDeta)

    
    if(response.data.success){
     showsnackbar(response.data?.message || 'Login Success')
    }

    } catch (error) {
      const message=error.response?.data?.message || error.message || 'Login Failds'
      console.log('Login Error:', error.response.data.message);
      showsnackbar(message , 'error')
      setisSubmitting(false)
      
      
    }
    finally{
       setisSubmitting(false)
    }
  };

  return (
    // 👈 KeyboardAvoidingView:
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} 
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
            Sign in to your{'\n'}Account
          </Text>

          {/* 3. Subtitle Row */}
          <View style={styles.subTitleRow}>
            <Text style={styles.subTitleText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* ImageBackground ke Bad */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched,isSubmitting }) => (
            <View style={styles.Content}>
              <View>
                {/* // EditInputComponents */}
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
                  label="password"
                  placeholder="Enter your password"
                  keyboardType="default"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
               <ErrorText error={errors.password} touched={touched.password}></ErrorText>

                {/* 👈 Remember me and Forgot Password Row */}
                <View style={styles.rememberForgotRow}>
                  {/* Left Side: Checkbox + Remember me text */}
                  <TouchableOpacity
                    style={styles.rememberContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.forgotText}>Forgot Password ?</Text>
                  </TouchableOpacity>
                </View>
                  

                {/* //ButtonComponents */}
                <CustomButton 
                  onPress={handleSubmit}
                  title="Log In"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />

                {/* //Divider with Text --------login---- */}
                <View style={styles.dividerContainer}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>Or login with</Text>
                  <View style={styles.line} />
                </View>

                {/* // SocialButton Components */}
                <View style={styles.socialRow}>
    
                  <SocialButton
                    title="Google"
                    icon={require('../../../Assets/Image/google.png')}
                    onPress={handleGoogleLogin} 
                  />

                  <SocialButton
                    title="Facebook"
                    icon={require('../../../Assets/Image/2021_Facebook_icon.png')}
                    onPress={handleFacebookLogin}
                  />
                </View>

                {/* //TermsCondesion Text */}
                <View style={styles.disclaimerContainer}>
                  <Text style={styles.disclaimerText}>
                    By signing up, you agree to the{' '}
                    <Text 
                      style={styles.boldText}
                      onPress={() => console.log('Terms clicked')}
                    >
                      Terms of Service
                    </Text>
                    {' '}and{' '}
                    <Text 
                      style={styles.boldText}
                      onPress={() => console.log('Data Processing clicked')}
                    >
                      Data Processing Agreement
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Formik>
           
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
  );
};

export default LoginScreen;