const closeNote = document.querySelector(".privacy-close");
const note = document.querySelector(".privacy-note");
const dob = document.querySelector("#dob");
const checkBtn = document.querySelector("#check-btn");
const errorMsg = document.querySelector("#error-message");
const outputDiv = document.querySelector("#output");

const setErrorMsg = (msg) => {
  errorMsg.innerText = msg;
};

const resetErrorMsg = () => {
  errorMsg.innerText = "";
};

const removeOutput = () => {
  outputDiv.innerHTML = "";
};
dob.addEventListener("click", () => {
  resetErrorMsg();
  removeOutput();
});

const setOutput = (result, format, date, count) => {
  let result_date;
  switch (result) {
    case "isPalindrome":
      outputDiv.innerHTML = `<div><img src='./images/lucky.svg'></div><div style="margin:auto;"> Your birthday is a palindrome:) <span >in ${format} format</span></div>`;
      break;

    case "next":
      result_date = getDateString(date);
      outputDiv.innerHTML = `<div><img src='./images/unlucky.svg'></div><div style="margin:auto;">The nearest palindrome date is ${result_date.day}-${result_date.month}-${result_date.year} <span> in ${format} format</span>, you missed by ${count} days. </div>`;
      break;

    case "prev":
      result_date = getDateString(date);
      outputDiv.innerHTML = `<div><img src='./images/unlucky.svg'></div><div style="margin:auto;">The nearest palindrome date is ${result_date.day}-${result_date.month}-${result_date.year} <span> in ${format} format</span>, you missed by ${count} days. </div>`;
      break;

    default:
      break;
  }
};
const isInputValid = (date) => {
  if (date) {
    return true;
  } else {
    setErrorMsg("Enter Your Birthdate");
  }
};
closeNote.addEventListener("click", () => {
  note.style.display = "none";
});

const getDateString = (date) => {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
};
const isStrPallindrome = (dateStr) => {
  let flag = true;
  let lenDateStr = dateStr.length - 1;
  for (let i = 0; i < lenDateStr / 2; i++) {
    if (dateStr[i] != dateStr[lenDateStr - i]) {
      flag = false;
      break;
    }
  }

  if (flag) {
    return true;
  } else {
    return false;
  }
};

const getDateInAllFormats = (date) => {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

const checkAllFormats = (dateStr) => {
  let allFormats = getDateInAllFormats(dateStr);
  const dateFormats = [
    "dd-mm-yyyy",
    "mm-dd-yyyy",
    "yyyy-mm-dd",
    "dd-mm-yy",
    "mm-dd-yy",
    "yy-dd-mm",
  ];
  let allResults = [];
  for (let x = 0; x < allFormats.length; x++) {
    allResults.push({
      result: isStrPallindrome(allFormats[x]),
      format: dateFormats[x],
    });
  }
  return allResults;
};
const isLeapYear = (year) => {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};
const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getPrevDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getPreviousPalindromeDate = (date) => {
  let previousDate = getPrevDate(date);
  let count = 0;

  while (true) {
    count++;
    let dateStr = getDateString(previousDate);
    let resultList = checkAllFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i].result) {
        return [count, previousDate, resultList[i].format];
      }
    }
    previousDate = getPrevDate(previousDate);
  }
};

const getNextPalindromeDate = (date) => {
  let nextDate = getNextDate(date);
  let count = 0;
  while (true) {
    count++;
    let dateStr = getDateString(nextDate);
    let resultList = checkAllFormats(dateStr);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i].result) {
        return [count, nextDate, resultList[i].format];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

const checkPallindrome = () => {
  const inputDate = dob.value.split("-");
  const yyyy = inputDate[0];
  const mm = inputDate[1];
  const dd = inputDate[2];

  const date = {
    day: Number(dd),
    month: Number(mm),
    year: Number(yyyy),
  };

  const dateStr = getDateString(date);
  const results = checkAllFormats(dateStr);
  let isPall = false;
  let k;
  for ( k = 0; k < results.length; k++) {
    if (results[k].result === true) {
      isPall = true;
      break;
    }
  }
  if (!isPall) {
    const [count1, next_date, next_date_format] = getNextPalindromeDate(date);
    const [count2, prev_date, prev_date_format] =
      getPreviousPalindromeDate(date);

    if (count1 > count2) {
      setOutput("prev", prev_date_format, prev_date, count2);
    } else {
      setOutput("next", next_date_format, next_date, count1);
    }
  } else {
    setOutput("isPalindrome", results[k].format);
  }
};

checkBtn.addEventListener("click", () => {
  if (isInputValid(dob.value)) {
    checkPallindrome();
  }
});
