import apiClint from "./apiClint";


// Signup Api call from Backend
 export const Signup= async(AuthSignup)=>{
    const EndPoint= 'api/auth/signup'

    console.log(`🚀 [API START] - Calling PostDeta (Signup) | Endpoint: ${EndPoint}`)
    console.log('📦 [PAYLOAD]', JSON.stringify(AuthSignup, null, 2))

try{
    const response = await apiClint.post(EndPoint,AuthSignup)
    console.log(`User_Id :${response.data?.user_id} `)
     console.log(`✅ [API SUCCESS] - Signup Successful |  Success :${response.data?.success} |Status: ${response.status} | message:${response.data?.message}`)
     console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
     console.log('All Response',response)
     return response

}catch(err){
    if(err.response){
      console.error(`❌ [API ERROR] - Signup Failed |  Success: ${err.response?.data?.success} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - Signup | ${err.message} || Check Network `)

    }
 throw err
}
}

// Login Api call from Backend

  export const Login=async(AuthLogin)=>{
       const Endpoints= 'api/auth/Login'

        console.log(`🚀 [API START] - Calling LoginDeta (Login) | Endpoint: ${Endpoints}`)
       console.log('📦 [PAYLOAD]', JSON.stringify(AuthLogin, null, 2))
       try{
        const response=await apiClint.post(Endpoints,AuthLogin)
         console.log(`✅ [API SUCCESS] - Signup Successful |  Success:${response.data.success} | Status: ${response.status} message:${response.data?.message}`)
         console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
         console.log('All Response',response)
         return response

       }catch(err){
       if(err.response){
       console.error(`❌ [API ERROR] - Signup Failed |  Success: ${err.response?.data?.message} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
       console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - Signup | ${err.message} || Check Network `)
    }
       throw err

       }}
// // ForgotPassword Api call from Backend

export const ForgotPassword = async (AuthForgotPassword) => {
  const Endpoints = 'api/auth/forgot-password';

  console.log(`🚀 [API START] - Calling ForgotPassword | Endpoint: ${Endpoints}`);
  console.log('📦 [PAYLOAD]', JSON.stringify(AuthForgotPassword, null, 2));

  try {
    const response = await apiClint.post(Endpoints, AuthForgotPassword);
    console.log(`✅ [API SUCCESS] - ForgotPassword Successful | Success:${response.data?.success} |Status: ${response.status} |message:${response.data?.message} `);
    console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - ForgotPassword Failed |  Success:${err.response?.data?.success} | Status ${err.response?.status} | message :${err.response?.data?.message}`);
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - ForgotPassword | ${err.message} || Check Network`);
    }
    throw err;
  }
};

// // OTP Api call from Backend

 export const OTP=async(AuthOTP)=>{
     const Endpoints = 'api/auth/Otp';

     console.log(`🚀 [API START] - Calling OTP | Endpoint: ${Endpoints}`);
     console.log('📦 [PAYLOAD]', JSON.stringify(AuthOTP, null, 2));
     try{
        const response=await apiClint.post(Endpoints,AuthOTP)
           console.log(`✅ [API SUCCESS] - OTP Successful | Success:${response.data?.success} |Status: ${response.status} | message:${response.data?.message}`);
           console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2));
        return response;


     }catch(err){
        if (err.response) {
      console.error(`❌ [API ERROR] - OTP Failed |  Success:${err.response?.data?.success} | Status ${err.response?.status} | message :${err.response?.data?.message} `);
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - OTP | ${err.message} || Check Network`);
    }
    throw err;
  }
     }

     // // RecreatPassword  Api call from Backend

export const RecreatePassword = async (AuthRecreatePassword) => {
  const Endpoints = 'api/auth/resetpassword';

  console.log(`🚀 [API START] - Calling RecreatePassword | Endpoint: ${Endpoints}`);
  console.log('📦 [PAYLOAD]', JSON.stringify(AuthRecreatePassword, null, 2));

  try {
    const response = await apiClint.post(Endpoints, AuthRecreatePassword);
    console.log(`✅ [API SUCCESS] - RecreatePassword Successful | Success:${response.data?.success} | Status: ${response.status} | message:${response.data?.message}`);
    console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - RecreatePassword Failed |  Success:${err.response?.data?.success} | Status ${err.response?.status} | message :${err.response?.data?.message}`);
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - RecreatePassword | ${err.message} || Check Network`);
    }
    throw err;
  }
};








