import { getData, getLoginUser, login } from "../utils/function.mjs"

const email = document.getElementById('email')
const password = document.getElementById('password')
const LoginBtn = document.getElementById('LoginBtn')


const checkLogin = async() =>{
    const LogginUser  = await getLoginUser()
    if(LogginUser){
        console.log('User Login Hai')
        const readData = await getData("Users",LogginUser.uid)
        if(readData.status){
            alert("Data Mil Gaya")
            if(LogginUser.emailVerified){
                window.location.href = "../home/index.html"
            }else{
                window.location.href = "../VerifyAccount/index.html"
            }
            // window.location.href = "../home/index.html"
        }
        else{
            console.log("Data Nahi Mila")
        }
        console.log(LogginUser)
    }
    else{
        console.log("User Not Login")
    }
}
checkLogin()
const loginHandler = async() =>{
    if (!email.value || !password.value) {
        return alert('Please Fill All the Input')
    }
    if (password.value.length < 8) {
        return alert("Password Atleast 8 character")
    }
    const Logging = await login(email.value,password.value)
    // console.log(Logging)
    if(Logging.status){
        console.log("Login Hogaya")
        window.location.href = "../VerifyAccount/index.html"
    }
    else{
        console.log("Login Nahi Hua")
    }
}


LoginBtn.addEventListener('click',loginHandler)