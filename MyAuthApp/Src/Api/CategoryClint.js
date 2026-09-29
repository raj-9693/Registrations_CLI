import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClint from './apiClint'

// Get Category
 export const getCategory=async()=>{

    const Endpoints = '/api/categories/';
  const token = await AsyncStorage.getItem('userToken');
  console.log('Token nahi hai:', token);

    console.log(`🚀 [API START] - Calling PostDeta (Categories) | Endpoint: ${Endpoints}`)
  
     try{
   const response=await apiClint.get(Endpoints)

       console.log(`User_Id : ${response.data?.user?.id}`);
      console.log(`✅ [API SUCCESS] - Notespost Successful |  Success :${response.data?.success} |Status: ${response.status} 
        | message:${response.data?.message}`)

     console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
     console.log('All Response',response)
     return response
     }catch(err){
 if(err.response){
      console.error(`❌ [API ERROR] - notesAll Failed |  Success: ${err.response?.data?.success} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - Signup | ${err.message} || Check Network `)

    }
 throw err

    }
     }
