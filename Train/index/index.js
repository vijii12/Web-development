document.addEventListener("DOMContentLoaded",function(){
    console.log("In index.js")
    const form=document.getElementById("search-form");

    document.getElementById("search-btn").addEventListener("click",function(event){
        event.preventDefault()//prevent form submission
        
        //get values from form

        const from=document.getElementById("from").value;
        const to=document.getElementById("to").value; 
        const date=document.getElementById("date").value;
        const trainClass=document.getElementById("classes").value;
        console.log(from);
        console.log(to);
        if(!from || !to || !date || !trainClass){
            alert("please fill all fields before searching");
            return;
        }

        
        //url for api

        const url=`http://localhost:8080/api/trains/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&trainClass=${encodeURIComponent(trainClass)}`;

        fetch(url,{
          method:"GET"  
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`HTTP error!! ${response.status}`);
            }
           return response.json();
        })   
        .then(data=>{
            console.log("fetch Data",data);
            localStorage.setItem("trainSearchResults",JSON.stringify(data));
            window.location.href="search.html";
        })
        .catch(error=>{
            console.error("Error fetching train data:",error);
            alert ("failed to fetch train data!!");
        });

    })
})