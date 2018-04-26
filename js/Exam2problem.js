function MenuChoice()
{
 if (document.getElementById("menu").value == "Show Area 1")
 {
 document.getElementById("catlist").style.visibility = "visible";
 document.getElementById("createcat").style.visibility = "hidden";
 document.getElementById("updatecat").style.visibility = "hidden";
 document.getElementById("deletecat").style.visibility = "hidden";
 document.getElementById("aboutme").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Show Area 2")
 {
 document.getElementById("catlist").style.visibility = "hidden";
 document.getElementById("createcat").style.visibility = "visible";
 document.getElementById("updatecat").style.visibility = "hidden";
 document.getElementById("deletecat").style.visibility = "hidden";
 document.getElementById("aboutme").style.visibility = "hidden";
 }
else if (document.getElementById("menu").value == "Show Area 3")
 {
 document.getElementById("catlist").style.visibility = "hidden";
 document.getElementById("createcat").style.visibility = "hidden";
 document.getElementById("updatecat").style.visibility = "visible";
 document.getElementById("deletecat").style.visibility = "hidden";
 document.getElementById("aboutme").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Show Area 4")
 {
 document.getElementById("catlist").style.visibility = "hidden";
 document.getElementById("createcat").style.visibility = "hidden";
 document.getElementById("updatecat").style.visibility = "hidden";
 document.getElementById("deletecat").style.visibility = "visible";
 document.getElementById("aboutme").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Show Area 5")
 {
 document.getElementById("catlist").style.visibility = "hidden";
 document.getElementById("createcat").style.visibility = "hidden";
 document.getElementById("updatecat").style.visibility = "hidden";
 document.getElementById("deletecat").style.visibility = "hidden";
 document.getElementById("aboutme").style.visibility = "visible";
 }
 else
 {
 document.getElementById("catlist").style.visibility = "hidden";
 document.getElementById("createcat").style.visibility = "hidden";
 document.getElementById("updatecat").style.visibility = "hidden";
 document.getElementById("deletecat").style.visibility = "hidden";
 document.getElementById("aboutme").style.visibility = "hidden";
 }
}

function GetList()
{
   var objRequest = new XMLHttpRequest() ; // Create AJAX request object
   
   // Create URL and Query string 
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";

   
 
   // Checks that the object has returned data 
   objRequest.onreadystatechange = function()
   {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText) ;
            GenerateOutput(output) ; 
        }
   }
   
   //Initiate the server request 
   objRequest.open("GET", url, true) ;
   objRequest.send() ; 
   
  function GenerateOutput(result)
{
  var count = 0 ;
  var displaytext = "<table><tr><th>Category ID</th><th></th><th>Category Name</th><th></th><th></th><th>Category Description</th></tr>" ;
  
  //Loop to extract data from the response object
  for (count=0; count < result.GetAllCategoriesResult.length; count++)
  {
    displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + " </td><td>" + "</td><td> " + result.GetAllCategoriesResult[count].CName + " </td><td>" + "</td><td>"+ "</td><td> " + result.GetAllCategoriesResult[count].CDescription + "</td></tr>"; 
    
  }
  
  
  displaytext += "</table>" ;
  document.getElementById("displaycategorylist").innerHTML = displaytext; 
  
}
}

function CreateProduct()
{
  
    
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //collect customer data from the web page
    var categoryname = document.getElementById("catname").value;
    var categorydescription = document.getElementById("catdescrip").value;

    
    //Create the parameter string
    var newproduct = '{"CName":"' + categoryname + '","CDescription":"' + categorydescription + '"}';
    
    // Checking for AJAX operation return and status
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status ==200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newproduct);
    
function OperationResult(result) 
{
    if(result.WasSuccessful == 1)
    {
        document.getElementById("displayadd").innerHTML = " You have successfully added a product!" ;
    }
    
    else
    {
        document.getElementById("displayadd").innerHTML = "The operation was not successful." + "<br>" + result.Exception ;
    }
}
   }

function UpdateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //collect customer data from the web page
    var categoryid = document.getElementById("idcat").value;
    var catdescrip = document.getElementById("description").value;

    
    //Create the parameter string
    var updatedescrip = '{"CID":"' + categoryid + '","CDescription":"' + catdescrip + '"}';
    
    // Checking for AJAX operation return and status
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status ==200)
        {
            var updaterecord = JSON.parse(objRequest.responseText);
            StatusResult(updaterecord);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(updatedescrip);
    
function StatusResult(result)
{
    if(result.WasSuccessful == 1)
    {
        document.getElementById("displayupdate").innerHTML = "You have updated the category description!";
    }
    else
    {
        document.getElementById("displayupdate").innerHTML = "<h1 style='color:red'>The operation was not successful.</h1>" + "<br>" + result.Exception;
    }
}

}

function DeleteCategory()
{
   var objRequest = new XMLHttpRequest() ; // Create AJAX request object
   
   // Create URL and Query string 
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
   url += document.getElementById("deleteid").value; 

   
 
   // Checks that the object has returned data 
   objRequest.onreadystatechange = function()
   {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText) ;
            DeletionResult(output) ; 
        }
   }
   
   //Initiate the server request 
   objRequest.open("GET", url, true) ;
  var check = confirm("Do you wish to delete?");
   if(check == true)
   {
     objRequest.send() ; 

function DeletionResult(result)
{
      if(result.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("displayconfirm").innerHTML = " You have successfully deleted a customer from the database!" ;
    }
    
    else
    {
        document.getElementById("displayconfirm").innerHTML = "<h1 style='color:red'>The operation was not successful.</h1>" + "<br>" + result.DeleteCategoryResult.Exception ;
    }
  
}
   }
   else
   {
   document.getElementById("displayconfirm").innerHTML= "Your request was canceled.";   
   }
}

