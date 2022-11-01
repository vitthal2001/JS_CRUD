//created empty object and array
let place={};
let places=[];


// function to read value from input fields 
//with using trim() we remove spacing from beginning and ending and only takes value
function readValue(property,value)
{
    if(value.trim().length!==0)
    {
        place[property]=value;
    }
 
    
}
// function to add a place in array and update localstorage 
//here we create copy of our object and then we place it into a array
function addPlace()
{
    places.push({...place});
    
    localStorage.setItem("places",JSON.stringify(places));

}


//first we load the page to check whether their is data available in local 
//storage or not if it is not availble then craete a empty array and if it is
//available then take into a variable and then parse it because it is in json
//format and then call displayDataastable() function
window.addEventListener("load",function(){

    let localdata=localStorage.getItem("places");
    if(localdata===null)
    {
        localStorage.setItem("places",JSON.stringify([]));
    }
    else 
    {
        places=JSON.parse(localdata);
        displayDataAsTable();
       
    }
})




// function to display data as table 
//first it clear the table means tbody and then create a table row and data
//when we loop places array
function displayDataAsTable()
{

    document.getElementById("places").innerHTML=" ";

    places.forEach((place,index)=>{

        let {name,price,package}=place;

        let tr=document.createElement("tr");

        let noTd=document.createElement("td");
        noTd.append(index+1);

        let nameTd=document.createElement("td");
        nameTd.append(name);

        let priceTd=document.createElement("td");
        priceTd.append(price);

        let packageTd=document.createElement("td");
        packageTd.append(package);

        let actionTd=document.createElement("td");

        let view=document.createElement("i");
        view.classList="fa-sharp fa-solid fa-eye view";

        view.addEventListener("click",function(){
            viewData(index);
        })
        

        

        let trash=document.createElement("i");
        trash.classList="fa-sharp fa-solid fa-trash delete";

        trash.addEventListener("click",function(event){
            deletePlace(index);
            event.target.parentNode.parentNode.remove();
        })

        actionTd.append(view,trash);

        tr.append(noTd,nameTd,priceTd,packageTd,actionTd);

        document.getElementById("places").append(tr);

    })

}


// function to delete a place 
//it delete the the particuular row with id we prvide to it and then update 
//the local storage
function deletePlace(i)
{
    places.splice(i,1);
   
    localStorage.setItem("places",JSON.stringify(places));
}


// function to display data in modal
//when we click on the view button then this function invokes and 
//then the row we want to view we give its id and then we put values inside it
function viewData(i)
{
    let {name,price,package,description,imageURL}=places[i];
    
    document.getElementById("place-img").src=imageURL;
    document.getElementById("place-name").innerText=name;
    document.getElementById("place-price").innerText=price;
    document.getElementById("place-package").innerText=package;
    document.getElementById("place-description").innerText=description;
    
    document.getElementById("main-modal").style.display="flex";
}

//we created this to to close this modal when we 
function closeModal()
{
    document.getElementById("main-modal").style.display="none";
}





