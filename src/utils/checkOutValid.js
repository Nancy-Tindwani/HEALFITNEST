import './validate.css'
export default function validate()
{
    let count=0;
    let address=document.getElementById("address").value;
    let postal_code=document.getElementById("postal_code").value
    let city=document.getElementById('city').value
    let country=document.getElementById('country').value

    checkaddress(address)
    checkpostalcode(postal_code)
    checkcity(city)
    checkcountry(country)
    
    if(checkaddress(address) && checkpostalcode(postal_code) && checkcity(city) && checkcountry(country))
    {
        return true;
    }
    else
    {
        return false;
    }
     
    
}
function checkaddress(address)
{
    if(address.length!=0)
    {
        
        document.getElementById("address_error").innerHTML=''
        return(true)
    }
    else
    { 
        
        document.getElementById("address_error").innerText='Enter the delivery address'
        return(false)
        
    }
    
}
function checkpostalcode(postal_code)
{
    if(postal_code.length==6)
    {
        
        document.getElementById("postalcode_error").innerHTML=''
        return(true)
    }
    else
    { 
        
        document.getElementById("postalcode_error").innerText='Postal code should contain 6 digits'
        return(false)
    }
    
}
function checkcity(city)
{
    if(city.length!==0)
    {
        
        document.getElementById("city_error").innerHTML=''
        return(true)
    }
    else
    { 
        
        document.getElementById("city_error").innerText='Please enter the city'
        return(false)
    }
    
}
function checkcountry(country)
{
    if(country.length!==0)
    {
        
        document.getElementById("country_error").innerHTML=''
        return(true)
    }
    else
    { 
        
        document.getElementById("country_error").innerText='Please enter the country'
        return(false)
    }
    
}
// function checkbox()
// {
//     if(document.getElementById('checkbox').checked==true)
//     {
//         document.getElementById("checkbox_error").innerHTML=''
//         return(true)
//     }
//     else
//     {
//         document.getElementById("checkbox_error").innerText='Please accept the terms and conditions'
//         return(false)
//     }
// }