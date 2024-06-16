let username = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let form = document.querySelector("form");
let Euser = document.querySelectorAll("span")[0];
let Epass = document.querySelectorAll("span")[1];
let Eform = document.querySelectorAll("span")[2]
console.log(username,password,form);
let lstorage = JSON.parse(localStorage.getItem("lstorage"));
console.log(lstorage);

//  form.addEventListener("submit",()=>{
//     if(username.value==="" && password.value===""){
//         alert("UserName is Required");
//         alert("Password is Required")
//     }
//     else if(username.value===""){
//         alert("UserName is Required");
//     }
//     else if(password.value===""){
//         alert("Password is Required");
//     }
//     else if(username.value === "Adarsh" && password.value === "1234"){
//         alert("Boss,Welcome to the page");
//     } 
//     else{
//         alert("You Are not the right person to enter this page ")
//     }
//  });

 form.addEventListener("submit",(e)=>{

   Euser.innerHTML = ""
   Epass.innerHTML = ""
   Eform.innerHTML = ""

   let matching = lstorage.find((e)=>{
      if(e.userMobile == username.value && e.userPassword == password.value)
      return e 
   })
   console.log(matching);


     if(username.value=== "" && password.value===""){
        Euser.innerHTML = "MAD type the  user name";
        Epass.innerHTML = "MAD type the password";
        e.preventDefault();
     }
    else if(username.value===""){
        Euser.innerHTML = "MAD type the  user name";
        e.preventDefault();
     }
     else if (password.value===""){
        Epass.innerHTML = "MAD type the password";
        e.preventDefault();
     }
     else if(matching){
        alert("Boss,Welcome to the page");
        localStorage.setItem("user",JSON.stringify(matching))
     }
     else{
        Eform.innerHTML=="You Are not the right person to enter this page"
        e.preventDefault();
     }

 });