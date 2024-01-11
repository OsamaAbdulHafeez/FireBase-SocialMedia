import { UpdateDataByDB, getData, getLoginUser, uploadFile } from "../utils/function.mjs"

const profileImg = document.getElementById('profileImg')
const name = document.getElementById('name')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const phone = document.getElementById('Phone')
const gender = document.getElementById('gender')
const spinner = document.querySelector('.spinner-border')
const info = document.querySelector('.info')
const loader = document.querySelector('.loader')

const Inputname = document.getElementById('Inputname')
const InputlastName = document.getElementById('InputlastName')
const Inputemail = document.getElementById('Inputemail')
const InputPNumber = document.getElementById('InputPNumber')
const InputGender = document.getElementById('InputGender')
const Inputfile = document.getElementById('Inputfile')
const updateBtn = document.getElementById('updateBtn')
const updateProPic = document.getElementById('updateProPic')

let uid;
const checkLogin = async () => {
    const Loginuser = await getLoginUser()
    if (Loginuser) {
        uid = Loginuser.uid
        const readData = await getData('Users', Loginuser.uid)
        console.log(readData)
        if (readData.status) {
            spinner.style.display = "none"
            loader.style.height = "0vh"
            info.style.display = "flex"
            name.innerHTML = readData.data.name ? readData.data.name : "No Name Founded"
            lastName.innerHTML = readData.data.lastName ? readData.data.lastName : "No LastName Founded"
            email.innerHTML = readData.data.email ? readData.data.email : "No Email Founded"
            phone.innerHTML = readData.data.phone ? readData.data.phone : "No Phone Founded"
            gender.innerHTML = readData.data.gender ? readData.data.gender : "No Gender Founded"
            profileImg.src = readData.data.profilePicture ? readData.data.profilePicture : "../Images/personLogo.jpg"

            Inputname.value = readData.data.name ? readData.data.name : ""
            InputlastName.value = readData.data.lastName ? readData.data.lastName : ""
            Inputemail.value = readData.data.email ? readData.data.email : ""
            InputPNumber.value = readData.data.phone ? readData.data.phone : ""
            InputGender.value = readData.data.gender ? readData.data.gender : ""
        }
    }
    else {
        window.location.href = "../Login/index.html"
    }
}
checkLogin()

const upadteProfileHandler = async () => {
    const readData = await getData('Users', uid)
    const data = readData.data
    const dataObj = {
        name: Inputname.value,
        lastName: InputlastName.value,
        email: Inputemail.value,
        phone: InputPNumber.value,
        gender: InputGender.value,
        profilePicture: data.profilePicture ? data.profilePicture : ""
    }
    const updateData = await UpdateDataByDB(dataObj, "Users", uid)
    spinner.style.display = "block"
    loader.style.height = "80vh"
    info.style.display = "none"
    checkLogin()

    console.log(dataObj)
    console.log(uid)
}
updateBtn.addEventListener('click', upadteProfileHandler)

const uploadPictureHandler = async () => {
    const imageName = Inputfile.files[0].name
    const uploadPic = await uploadFile(Inputfile.files[0], `Users/${uid}`)
    if (uploadPic.status) {
        console.log("File Uploaded")
        const readData = await getData('Users', uid)
        const datas = readData.data
        const dataObj = {
            name: datas.name,
            lastName: datas.lastName,
            email: datas.email,
            phone: datas.phone,
            gender: datas.gender,
            profilePicture: uploadPic.data
        }
        const updateData = await UpdateDataByDB(dataObj, "Users", uid)
        spinner.style.display = "block"
        loader.style.height = "80vh"
        info.style.display = "none"
        // checkLogin()
    }
    else {
        console.log("Error")
    }
}
updateProPic.addEventListener('click', uploadPictureHandler)