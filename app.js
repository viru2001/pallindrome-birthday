const closeNote = document.querySelector(".privacy-close");
const note = document.querySelector(".privacy-note");
const dob = document.querySelector("#dob");
const checkBtn = document.querySelector("#check-btn");
const errorMsg = document.querySelector("#error-message");
const outputDiv = document.querySelector("#output");

const setErrorMsg = (msg)=>{
    errorMsg.innerText = msg;
}

const resetErrorMsg = ()=>{
    errorMsg.innerText = "";
}

const removeOutput = ()=>{
    outputDiv.innerHTML = "";
}
dob.addEventListener('click',()=>{
    resetErrorMsg();
    removeOutput();
});
const setOutput = (isPallindrome,format="")=>{
    if(isPallindrome){
        outputDiv.innerHTML = " <img src='images/lucky.svg'/><p>Your Birthday is Pallindrome :)<br> in "+format +" format</p>";
    }
    else{
        outputDiv.innerHTML = " <img src='images/unlucky.svg'/><p>Your Birthday is not pallindrome :( </p>";
    }
}

const isInputValid = (date)=>{
    if(date){
        return true;
    }
    else{
        setErrorMsg("Enter Your Birthdate");
    }
}
closeNote.addEventListener("click",()=>{
    note.style.display = "none";
});

const getDateString = (date)=> {
    var dateStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
}
const isStrPallindrome = (dateStr)=>{
    let flag = true;
    let lenDateStr = dateStr.length-1;
    for(let i=0;i<(lenDateStr/2);i++){
        // console.log(dateStr[i] , dateStr[lenDateStr-i]);
        if(dateStr[i] != dateStr[lenDateStr-i]){
            flag=false;
            break
        }
    }
     
    if(flag){
        return true;
    }
    else{
        return false;
    }
}

const getDateInAllFormats = (date)=> {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }

  const checkAllFormats = (allFormats)=>{
    const dateFormats = ["dd-mm-yyyy", "mm-dd-yyyy", "yyyy-mm-dd", "dd-mm-yy", "mm-dd-yy", "yy-dd-mm"];
    let allResults = [];
    allFormats.map((date,index)=>{
        allResults.push({"result":isStrPallindrome(date),"format":dateFormats[index]});
    });
    return allResults;
  }
const checkPallindrome = ()=>{
    const inputDate = dob.value.split("-");
    const yyyy = inputDate[0];
    const mm = inputDate[1];
    const dd = inputDate[2];

    const date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
    }

    const dateStr = getDateString(date);
    const allFormats = getDateInAllFormats(dateStr);
    const results = checkAllFormats(allFormats);
    return results;
  
}
checkBtn.addEventListener("click",()=>{
    if(isInputValid(dob.value)){
        const results =  checkPallindrome();
        // console.log(results);
        let flag = true;
        for(let i=0;i<results.length;i++){
            if(results[i].result === true){
                setOutput(true,results[i].format);
                flag = false;
                break
            }
        }
        if(flag){
            setOutput(false);
        }
        
        // if(isPallindrome){
        //     setOutput(true);
        // }
        // else{
        //     setOutput(false);
        // }
    }
});



