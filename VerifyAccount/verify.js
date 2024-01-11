import { auth, sendEmailVerification } from "../utils/config.js";
import { AddDataByID, LogoutUser,  getData, getLoginUser } from "../utils/function.mjs"

const SignOutBtn = document.getElementById('SignOutBtn')
const VerifyBtn = document.getElementById('VerifyBtn')

const checkLogin = async() =>{
  const LogginUser  = await getLoginUser()
  if(LogginUser){
      console.log('User Login Hai')
      console.log(LogginUser,"===>user")
      const readData = await getData("Users",LogginUser.uid)
      if(readData.status){
          console.log("Data Mil Gaya")
          if(LogginUser.emailVerified){
              const dataobj = {
                name:readData.data.name,
                email:readData.data.email,
                emailVerified:LogginUser.emailVerified
              }
              console.log(dataobj)
              const UserAddDB = await AddDataByID(dataobj, 'Users', LogginUser.uid)
              window.location.href = "../home/index.html"
          }
      }
      else{
          console.log("Data Nahi Mila")
      }
  }
  else{
      console.log("User Not Login")
  }
}
checkLogin()

const sentEmailHandler = () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      console.log("Email Sent")
    });
}

VerifyBtn.addEventListener('click',sentEmailHandler)

const LogoutHandler = async() =>{
  const LoggedOut = await LogoutUser()
  if(LoggedOut.status){
      window.location.href = "../Login/index.html"
  }
  else{
      console.log(LoggedOut.message)
  }
}
SignOutBtn.addEventListener('click',LogoutHandler)