function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Display train details
document.getElementById("train-name").textContent = getQueryParam("trainName");
document.getElementById("train-number").textContent = getQueryParam("trainNumber");
document.getElementById("time").textContent = getQueryParam("time");
document.getElementById("classes").textContent=getQueryParam("classSeat");
document.getElementById("fare").textContent = getQueryParam("fare");

document.querySelectorAll("input[name='payment']").forEach(input=>{
    input.addEventListener("change",function(){
        if(this.value==="credit-card"){
            document.getElementById("credit-card-details").style.display="block";
            document.getElementById("upi-details").style.display="none";
        }
        else{
            document.getElementById("credit-card-details").style.display="none";
            document.getElementById("upi-details").style.display="block"; 
        }
    })
})

document.getElementById("pay-btn").addEventListener("click",function(){
    const passengerName=document.getElementById("passengerName").value;
    const passengerAge=document.getElementById("passengerAge").value;
    const passengerGender=document.getElementById("passengerGender").value;
    const selectedPayment=document.querySelector("input[name='payment']:checked").value;

    const trainNumber=getQueryParam("trainNumber");
    const trainName=getQueryParam("trainName");
    const departureTime=getQueryParam("time");
    const classSeat=getQueryParam("classSeat");
    const fare=getQueryParam("fare");

    if(!passengerName || !passengerAge || !passengerGender){
        alert("Please enter all passenger details");
        return;
    }

    const bookingData={
        trainNumber:trainNumber,
        trainName:trainName,
        departureTime:departureTime,
        classSeat:classSeat,
        fare:fare,
        name:passengerName,
        age:passengerAge,
        gender:passengerGender,
        paymentMethod:selectedPayment
    }

    fetch("http://localhost:8080/api/bookings/confirm",{
        method:"POST",
         headers: {  
        "Content-Type": "application/json"  
        },  
        body:JSON.stringify(bookingData)
    })
    .then(response=>response.text())
    .then(data=>{
        alert(data);
        window.location.href="confirmation.html";
    })
    .catch(error=>{
        console.log("Error processing booking:",error);
        alert("booking failed");
    })

})
