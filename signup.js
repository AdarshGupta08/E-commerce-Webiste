let fname = document.querySelectorAll("input")[0];
let lname = document.querySelectorAll("input")[1];
let email = document.querySelectorAll("input")[2];
let mobile = document.querySelectorAll("input")[3];
let dob = document.querySelectorAll("input")[4];
let password = document.querySelectorAll("input")[5];
let Cpassword = document.querySelectorAll("input")[6];
let form = document.querySelector("form");

let efname = document.querySelectorAll("span")[0];
let elname = document.querySelectorAll("span")[1];
let eemail = document.querySelectorAll("span")[2];
let emobile = document.querySelectorAll("span")[3];
let edob = document.querySelectorAll("span")[4];
let epassword = document.querySelectorAll("span")[5];
let eCpassword = document.querySelectorAll("span")[6];

let storage = [];
let lstorage = JSON.parse(localStorage.getItem("lstorage"));
console.log(lstorage);
if (lstorage) {
  storage = lstorage;
}

//  console.log(fname,lname,email,number,dob,password,Cpassword);
//  console.log(efname,elname,eemail,enumber,edob,epassword,eCpassword);
//  console.log(form);

form.addEventListener("submit", (e) => {
  let regx1 = /^[a-zA-Z]{2,15}$/; //regular expression syntax
  let regx2 = /^[6-9][0-9]{9}$/;
  let regx3 = /^[a-zA-Z0-9]{6,15}$/;
  //   let regx4 = /^[@]{10,30}$/;
  let flag = true;

  let mobileval = storage.find((e)=>{
    if(mobile.value === e.userMobile){
      return e;
    }
  });
  let emailval = storage.find((e)=>{
    if(email.value === e.userEmail){
      return e;
    }
  });


  // for First name
  if (fname.value == "") {
    efname.innerHTML = "*first name is required";
    e.preventDefault();
    flag = false;
  } else if (regx1.test(fname.value)) {
    efname.innerHTML = "";
  } else {
    efname.innerHTML = "min-2 char max-15 char with A-Z <br>";
    e.preventDefault();
    flag = false;
  }

  // for last name
  if (lname.value == "") {
    elname.innerHTML = "*last name is required";
  } else if (regx1.test(lname.value)) {
    elname.innerHTML = "";
  }

  // for email
  if (email.value == "") {
    eemail.innerHTML = "*email is required <br>";
    e.preventDefault();
    flag = false;
  }
  else if(emailval){
    eemail.innerHTML = "it is already exists";
    e.preventDefault();
   }
  //   else if (regx4.test(email.value)) {
  //     eemail.innerHTML = "";
  //   }
  //    else {
  //     eemail.innerHTML = "special character is required <br>";
  //     e.preventDefault();
  //     flag = false;
  //   }

  // for MObile number
  if (mobile.value == "") {
    emobile.innerHTML = "mobile number is required";
    e.preventDefault();
    flag = false;
  } 
  else if(mobileval){
   emobile.innerHTML = "it is already exists";
   e.preventDefault();
  }
  else if (regx2.test(mobile.value)) {
    emobile.innerHTML = "";
  }
   else {
    emobile.innerHTML = "Write correct number range <br>";
    e.preventDefault();
    flag = false;
  }

  // for PASSword
  if (password.value == "") {
    epassword.innerHTML = "password is required";
    e.preventDefault();
    flag = false;
  } else if (regx3.test(password.value)) {
    epassword.innerHTML = "";
  } else {
    epassword.innerHTML = "min-6 max-15 a-z A-Z 0-9 character are allowed <br>";
    e.preventDefault();
    flag = false;
  }

  // for confirm password
  if (Cpassword.value == password.value) {
    eCpassword.innerHTML = "";
  } else {
    eCpassword.innerHTML = "*Not matching";
    e.preventDefault();
    flag = false;
  }
  if (flag) {
    let obj = {
      userName: fname.value,
      userLastName: lname.value,
      userEmail: email.value,
      userMobile: mobile.value,
      userPassword: password.value,
      userDOB: dob.value,
    };

    storage.push(obj);
    localStorage.setItem("lstorage", JSON.stringify(storage));
  }
});
