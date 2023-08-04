const allRate = [
    { name: "club", rates: [{ sTime: 10, eTime: 16, rate: 100 }, { sTime: 16, eTime: 22, rate: 500 }] },
    { name: "tennis", rates: [{ sTime: 0, eTime: 24, rate: 50 }] }
  ];
  const bSlots = [];
  function booking() {

    const facility = document.getElementById("facility").value;
    const date = document.getElementById("date").value;
    const sTime = document.getElementById("sTime").value;
    const eTime = document.getElementById("eTime").value;

    const preBoo = bSlots.find(slot =>
        slot.facility === facility &&
        date === slot.date &&
        ((sTime >= slot.sTime && sTime < slot.eTime) ||
         (eTime > slot.sTime && eTime <= slot.eTime))
      );
    
      if (preBoo) {
        displayOutput("Booking Failed, Already Booked");
        return;
      }
    
      const selectedFacility = allRate.find(f => f.name === facility);
    
      if (!selectedFacility) {
        displayOutput("Facility not found");
        return;
      }
    
      const bSTime = new Date(`${date} ${sTime}`);
      const bETime = new Date(`${date} ${eTime}`);
      let totalCost = 0;
      console.log(bSTime);
      console.log(bETime);
    console.log(bSTime-bETime);
    console.log((bETime - bSTime) / (60 * 60 * 1000));
      for (const rate of selectedFacility.rates) {
        if (bSTime.getHours() >= rate.sTime && bETime.getHours() <= rate.eTime) {
          const bookingHours = (bETime - bSTime) / (60 * 60 * 1000);
          totalCost += rate.rate * bookingHours;
        }
        // else{
        //   console.log("incorrect booking");
        // }
        // console.log(rate);
      }
    
      bSlots.push({ facility, date, sTime, eTime });
    
      displayOutput(`Booked, Rs. ${totalCost}`);

  }

  function displayOutput(message) {
    const outputElement = document.getElementById("message");
    outputElement.textContent = message;
  }