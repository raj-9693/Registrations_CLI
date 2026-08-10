import { 
  Text, 
  View, 
  ImageBackground, 
  useWindowDimensions, 
  Image, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../../Components/CustomInput';
import CustomButton from '../../../Components/CustomButton';
import SocialButton from '../../../Components/SocialButton';
import styles from './Styles';

const LoginScreen = ({navigation}) => {
  const { width, height } = useWindowDimensions();
  const [rememberMe, setRememberMe] = useState(false);

  // 👈 FIX 1: Handler functions defined so app won't crash when passing to SocialButton
  const handleGoogleLogin = () => {
    console.log('Google Login Pressed');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login Pressed');
  };

  return (
    // 👈 KeyboardAvoidingView: कीबोर्ड खुलने पर इनपुट्स ऊपर खिसक जाएँगे
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
        <View style={styles.Content}>
          <View>
            {/* // EditInputComponents */}
            <CustomInput
              label="Email"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
            />
            <CustomInput
              label="password"
              placeholder="Loisbecket@gmail.com"
              keyboardType="email-address"
              // secureTextEntry={true} // 👈 COMMENT: अगर पासवर्ड हिडन रखना हो तो इसे यूज़ कर सकते हैं
            />

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
            onPress={()=>navigation.navigate('Signup')}
            title="Log In" />

            {/* //Divider with Text --------login---- */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or login with</Text>
              <View style={styles.line} />
            </View>

            {/* // SocialButton Components */}
            <View style={styles.socialRow}>
              {/* 👈 FIX 2 & 3: onPress={() => handleGoogleLogin()} फंक्शन कॉल सही की गई */}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;