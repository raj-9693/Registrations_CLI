import axios from "axios" ;
import AsyncStorage from '@react-native-async-storage/async-storage';



 
const BASE_URL = 'https://registrations-cli.onrender.com'  // Base URL

const apiClint=axios.create({
    baseURL: BASE_URL

})


apiClint.interceptors.request.use(
  async (config) => {

   

    try {
  // 📍 STEP 1: AsyncStorage से Token और User Info निकालना
  const token = await AsyncStorage.getItem('userToken');
  const userId = await AsyncStorage.getItem('userId');

  // 📍 STEP 2: Authorization Header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('JWT Token added to headers');
  } else {
    console.log('No JWT Token found in storage.');
  }

  // 📍 STEP 3: Custom user_id Header (Corrected lowercase _id)
  if (userId) {
    config.headers['user_id'] = userId;
    console.log('User ID added to headers:', userId);
  } else {
    console.log('No user ID found in storage');
  }

      console.log('Final request headers:', config.headers);
        console.log('Request URL:', config.baseURL + config.url);
      

      // 📍 STEP 4: मॉडिफाइड कॉन्फ़िगरेशन को आगे भेजना
      return config;

    } catch (error) {
      console.log(`❌ [REQUEST ERROR]: Token padhne me dikkat hui`, error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // अगर रिक्वेस्ट की कॉन्फ़िगरेशन बनते समय ही कोई एरर आ जाए
    console.log(`❌ [REQUEST CONFIG ERROR]:`, error);
    return Promise.reject(error);
  }
);

export default apiClint;
