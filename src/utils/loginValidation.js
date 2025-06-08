export default function validate()
{
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value
    let firstName=document.getElementById('firstName').value
    let lastName=document.getElementById('lastName').value
    let contact=document.getElementById('contact').value
    
    checkemail(email)
    checkpassword(password)
    firstnamecheck(firstName)
    lastnamecheck(lastName)
    checkphonenumber(contact)
    checkbox()
}
function checkemail(email)
{
    if(email.length>8 && email.includes("@gmail.com"))
    {
        
        document.getElementById("email_error").innerHTML=''
    }
    else
    { 
        
        document.getElementById("email_error").innerText='Email should contain @gmail.com and must be atleast 8 letters long'
    }
    
}
function checkpassword(password)
{
    if(password.length>5)
    {
        
        document.getElementById("password_error").innerHTML=''
    }
    else
    { 
        
        document.getElementById("password_error").innerText='Password should be atleast 5 letters long'
    }
    
}
function firstnamecheck(firstName)
{
    if(firstName.length!=0)
    {
       
        document.getElementById("firstname_error").innerHTML=''
    }
    else
    { 
        
        document.getElementById("firstname_error").innerText='First name required'
    }
    
}
function lastnamecheck(lastName)
{
    if(lastName.length!=0)
    {
        document.getElementById("lastname_error").innerHTML=''
    }
    else
    { 
        document.getElementById("lastname_error").innerText='Last name required'
    }
    
}
function checkphonenumber(contact)
{
    if(contact.length==10 && contact.length!==0)
    {
        
        document.getElementById("phonenumber_error").innerHTML=''
    }
    else
    { 
        
        document.getElementById("phonenumber_error").innerText='Phone number is required and should contain 10 digits'
    }
    
}
function checkbox()
{
    if(document.getElementById('checkbox').checked==true)
    {
        document.getElementById("checkbox_error").innerHTML=''
    }
    else
    {
        document.getElementById("checkbox_error").innerText='Please accept the terms and conditions'
    }
}