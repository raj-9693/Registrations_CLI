import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClint from './apiClint';



// Get Notes 
export const Notesdeta = async () => {
  const Endpoints = 'api/notes/all';
  const token = await AsyncStorage.getItem('userToken');
  console.log('Token he :', token);

    console.log(`🚀 [API START] - Calling GET-Notes  (Signup) | Endpoint: ${Endpoints}`)
    try{
const response= await apiClint.get(Endpoints, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Header यहीं पास होगा
    }, })

    console.log(`User_Id : ${response.data?.user?._id}`);
     console.log(`✅ [API SUCCESS] - Signup Successful |  Success :${response.data?.success} |Status: ${response.status} 
        | message:${response.data?.message}`)

     console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2))
     console.log('All Response',response)
     return response

   } catch (err) {

         if(err.response){
      console.error(`❌ [API ERROR] - notesAll Failed |  Success: ${err.response?.data?.success} |Status: ${err.response?.status} | message :${err.response?.data?.message}`)
      console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2))
    }else{
        console.error(`❌ [NETWORK ERROR] - Signup | ${err.message} || Check Network `)

    }
 throw err

    }
}

// Post Notes 
  export const Notespost=async(MyPost)=>{
  const Endpoints = '/api/notes/';
  const token = await AsyncStorage.getItem('userToken');
  console.log('Token nahi hai:', token);

    console.log(`🚀 [API START] - Calling PostDeta (Notes) | Endpoint: ${Endpoints}`)
     console.log('📦 [PAYLOAD]', JSON.stringify(MyPost, null, 2))

     try{
      const response=await apiClint.post(Endpoints,MyPost )

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

     // notes Update

    export const notsUpdates=async(MyUpdate,NotsID)=>{
       const Endpoints = `/api/notes/${NotsID}`;
       const token = await AsyncStorage.getItem('userToken');
       console.log('Token nahi hai:', token);

     console.log(`🚀 [API START] - Calling NotsUpdate (Notes) | Endpoint: ${Endpoints}`)
     console.log('📦 [PAYLOAD]', JSON.stringify(MyUpdate, null, 2))
     try{
      const response=await apiClint.put(Endpoints,MyUpdate)

       console.log(`User_Id : ${response.data?.user?.id}`);
      console.log(`✅ [API SUCCESS] - NotsUpdate Successful |  Success :${response.data?.success} |Status: ${response.status} 
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

     // nots Delete 

     export const NotsDelete = async (NotsId) => {
         const Endpoints = `/api/notes/${NotsId}`;
         const token = await AsyncStorage.getItem('userToken');
         console.log('Token nahi hai:', token);

         console.log(`🚀 [API START] - Calling NotsDelete (Notes) | Endpoint: ${Endpoints}`);

         try {
           const response = await apiClint.delete(Endpoints, {
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
             },
           });

           console.log(`✅ [API SUCCESS] - NotsDelete Successful | Success: ${response.data?.success} | Status: ${response.status}`);
           console.log('📬 [RESPONSE DATA]', JSON.stringify(response.data, null, 2));
           return response;
         } catch (err) {
           if (err.response) {
             console.error(`❌ [API ERROR] - NotsDelete Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
             console.error('🔍 [SERVER ERROR BODY]', JSON.stringify(err.response.data, null, 2));
           } else {
             console.error(`❌ [NETWORK ERROR] - NotsDelete | ${err.message} || Check Network`);
           }
           throw err;
         }

     }
