console.log("search.js loaded");
document.addEventListener("DOMContentLoaded",function(){
    const trainData=localStorage.getItem("trainSearchResults");

    if(trainData){
        const trains=JSON.parse(trainData);
        displayTrains(trains);
    }
    else{
        console.log("No train data found!!");
    }

    function displayTrains(trains){
        const trainResults=document.getElementById("train-results");
        console.log("Train Results:",trainResults);
        if(!trainResults){
            console.error("Train results not found!!");
            return;
        }

       
        trainResults.innerHTML="";//clear previous results

        if(trains.length===0){
            
            trainResults.innerHTML= `<h2 style="text-align: center; width: 100%;">No Trains available!!</h2>`
            return;
        }
        trains.forEach(train=>{

            if (train.seatAvailability && train.seatAvailability.length > 0) {
                train.seatAvailability.forEach(seat => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${train.trainName}</td>
                        <td>${train.trainNumber}</td>
                        <td>${train.departureTime}</td>
                        <td>${train.arrivalTime}</td>
                        <td>${train.duration}</td>
                        <td>${seat.classSeat}</td>
                        <td>${seat.availableSeats}</td>
                        <td>${seat.fare}</td>
                        <td><button class="book-btn" onclick="bookTicket('${train.trainNumber}','${train.trainName}','${train.departureTime}','${seat.classSeat}','${seat.fare}')">Book</button></td>
                    `;
                    trainResults.appendChild(row);
                    
                });
            } else {
                console.warn(`No seat availability for train ${train.trainName}`);
            }
            
            

        })

        
        
    }

    window.bookTicket=function(trainNumber,trainName,departureTime,classSeat,fare){
        const url=`booking.html?trainNumber=${encodeURIComponent(trainNumber)}&trainName=${encodeURIComponent(trainName)}&time=${encodeURIComponent(departureTime)}&classSeat=${encodeURIComponent(classSeat)}&fare=${encodeURIComponent(fare)}`

        window.location.href=url;
        
    }

    const bookHover=document.querySelectorAll(".book-btn");
    bookHover.forEach(button=>{
        button.addEventListener("mouseover",function(){
            this.style.backgroundColor="blue";
            this.style.color="white";
        })
    
        button.addEventListener("mouseout",function(){
            this.style.color="black";
            this.style.backgroundColor="white";
        })
    })
    
})