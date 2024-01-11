import { LogoutUser, addData, getData, getLoginUser, uploadFile } from "../utils/function.mjs"
const imag = document.querySelector('.imag')
const userName = document.getElementById('userName')
const SignOutBtn = document.getElementById('SignOutBtn')
const fullcontent = document.getElementById("fullcontent")
const spinner = document.querySelector('.spinner-border')
const loader = document.querySelector('.loader')
const postbtn = document.getElementById('postbtn')
const postText = document.getElementById('postText')
const postfile = document.getElementById('postfile')
const checkLogin = async() =>{
    const LogginUser = await getLoginUser()
    if(LogginUser){
        console.log('User Login Hai')
        const readData = await getData("Users",LogginUser.uid)
        if(readData.status){
            console.log("Data Mil Gaya")
            fullcontent.style.display = "block"
            spinner.style.display = "none"
            loader.style.height = "0vh"
            imag.src = readData.data.profilePicture ? readData.data.profilePicture : "../Images/personLogo.jpg"
            userName.textContent = readData.data.name
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

const posthandler = async() =>{
    const getFile = await uploadFile(postfile.files[0],postfile.files[0].name)
    console.log(getFile)
    // const postDataObj = {
    //     text : postText.ariaValueMax,
    //     picture : getFile
    // }
    // const postdata = await addData(postDataObj,'Posts')
}

postbtn.addEventListener('click',posthandler)
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