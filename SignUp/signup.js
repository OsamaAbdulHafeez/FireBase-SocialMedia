import { AddDataByID, getData, getLoginUser, signUp } from "../utils/function.mjs"

const names = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPass = document.getElementById('confirmPass')
const signupBtn = document.getElementById('signupBtn')

let LogginUser;
const checkLogin = async() =>{
    LogginUser  = await getLoginUser()
    if(LogginUser){
        console.log('User Login Hai')
        const readData = await getData("Users",LogginUser.uid)
        if(readData.status){
            console.log("Data Mil Gaya")
            if(LogginUser.emailVerified){
                window.location.href = "../home/index.html"
            }else{
                window.location.href = "../VerifyAccount/index.html"
            }
        }
        else{
            console.log("Data Nahi Mila")
        }
        // console.log(readData)
    }
    else{
        console.log("User Not Login")
    }
}
checkLogin()
const SignUP = async () => {
    if (!names.value || !email.value || !password.value || !confirmPass.value) {
        return alert('Please Fill All the Input')
    }
    if (password.value.length < 8) {
        return alert("Password Atleast 8 character")
    }
    if (password.value !== confirmPass.value) {
        return alert("Password Or Confirm Password Not Same")
    }

    const dataObj = {
        name: names.value,
        email: email.value
    }

    console.log(dataObj)
    const registering = await signUp(email.value, password.value)
    // console.log(registering.data.user.emailVerified)
    if (registering.status) {
        const EmailVerifyCheckObj = {
            ...dataObj,
            emailVerified:registering.data.user.emailVerified
        }
        
        const UserAddDB = await AddDataByID(EmailVerifyCheckObj, 'Users', registering.data.user.uid)
        if (UserAddDB.status) {
            alert(UserAddDB.message)
            window.location.href = "../Login/index.html"
        }
        else {
            alert(UserAddDB.message)
        }
    }
    else{
        alert(registering.message)
    }
}


signupBtn.addEventListener('click', SignUP)

