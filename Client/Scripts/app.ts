/*
File: app.ts
Name: Sanjay Mahabir
Student Id: 301231274
Date: June 4th 2022
*/


//Function to handle contact form
//stores form data in local storage
$("#submitBtn").on("click",function(){
    

    localStorage.setItem("fname", $("#fname").val() as string);
    localStorage.setItem("lname", $("#lname").val() as string);
    localStorage.setItem("pnum", $("#pnum").val() as string);
    localStorage.setItem("email", $("#email").val() as string);
    localStorage.setItem("message", $("#message").val() as string);

    window.location.assign("/")
    alert("storing data");

  });

//called on contact page when the page loads
//values previously entered are loaded back into form
$(function(){
   
    if("fname" in localStorage){
        $("#fname").val(localStorage.getItem("fname") as string);
    }
    if("lname" in localStorage){
        $("#lname").val(localStorage.getItem("lname") as string);
    }
    if("pnum" in localStorage){
        $("#pnum").val(localStorage.getItem("pnum") as string);
    }
    if("email" in localStorage){
        $("#email").val(localStorage.getItem("email") as string);
    }
    if("message" in localStorage){
        $("#message").val(localStorage.getItem("message") as string);
    }
     console.log("success");
    
  });


//IIFE
(function()
{

    function Start()
    {
        console.log("App Started!");

        // use AJAX to read JSON file

        // Step 1: Create a new XHR object
        let XHR = new XMLHttpRequest();

        // Step 2: Create the request
        XHR.open("GET", "../data/data.json");

        // Step 3: Send the request
        XHR.send();

        // Step 4: create an event listener/handler
        XHR.addEventListener("readystatechange", function()
        {
            if(XHR.readyState == 4 && XHR.status == 200)
            {
                console.log("JSON Data:");
                console.log("===========");
                console.log(XHR.responseText);
            }
        });
    }

    window.addEventListener("load", Start);

})();


