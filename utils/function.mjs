import { auth, createUserWithEmailAndPassword, db, doc, setDoc, serverTimestamp, getDoc, signOut, signInWithEmailAndPassword, uploadBytes, ref, storage, getDownloadURL, addDoc, collection } from "./config.js"

const signUp = async (email, password) => {
    try {
        const register = await createUserWithEmailAndPassword(auth, email, password)
        return {
            status: true,
            message: "User Regitser Successfully",
            data: register
        }
    } catch (error) {
        return {
            status: false,
            message: error.message,
            code: error.code
        }
    }
}
const login = async (email,password) => {
    try {
        const logging = await signInWithEmailAndPassword(auth, email, password)
        return {
            status: true,
            message: "User Login Successfully",
            data: logging
        }
    } catch (error) {
        return {
            status: false,
            message: error.message,
            code: error.code
        }
    }
}
const AddDataByID = async (data, collectionName, id) => {
    try {
        // const dataWithTimeStamp = {
        //     ...data,
        //     timestamp : serverTimestamp()
        // }
        const addData = await setDoc(doc(db, collectionName, id), data)
        return {
            status: true,
            message: "Data Store Successfully",
            data: addData
        }
    } catch (error) {
        return {
            status: false,
            message: error.message,
            code: error.code
        }
    }
}
const addData = async(data,collectionName) =>{
    try{
        const add = await addDoc(collection(db, collectionName),data)
        return{
            status:true,
            message:"Data Store Successfully",
            data:add
        }
    }catch(error){
        return{
            status:false,
            message:error.message
        }
    }
    
}
const UpdateDataByDB = async(data,collectionName,id) =>{
    try{
        const UpdatedData = await setDoc(doc(db, collectionName, id),data)
        return{
            status:true,
            message:"Data Update Successfully",
            data:UpdatedData
        }
    }catch(error){
        return{
            status:false,
            message:error.message
        }
    }
}
const getData = async(collectionName,id) => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return{
                status:true,
                message:"Data Founded",
                data:docSnap.data()
            }
        }
        else{
            return{
                status:false,
                message:"No Such Document"
            }
        }
    } catch(error){
        return{
            status:false,
            message:error.message
        }
    }
}

const uploadFile = async(file,fileName) =>{
    try{
        const storageRef = ref(storage, fileName)
        const snapshot = await uploadBytes(storageRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref)
        return{
            status:true,
            message:"File Upload Successfully",
            data:downloadUrl
        }
    }catch(error){
        return{
            status:false,
            message:error.message
        }
    }
}
const getLoginUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe()
            resolve(user)
        }, reject)
    })
}

const LogoutUser = async() =>{
    try{
        const logOut = await signOut(auth)
        return{
            status:true,
            message:"Logout Successfully"
        }
    }catch(error){
        return{
            status:false,
            message:error.message
        }
    }
}
export { signUp, getLoginUser, login, AddDataByID,getData, LogoutUser,UpdateDataByDB,uploadFile,addData}