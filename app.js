const inputDate = document.querySelector("#input-bday");
const showBtn = document.querySelector("#show-btn");
const outputBox = document.querySelector("#output-box")


function clickHandler() {
    var bdaystr = inputDate.value;

    if (bdaystr !== '') {
        var listOfDate = bdaystr.split('-');

        var date = {
                day: Number(listOfDate[2]),
                month: Number(listOfDate[1]),
                year: Number(listOfDate[0]),
            }
            //console.log(listOfDate, date)

        var isPalindrome = checkPalindromeForAllDateFormats(date)

        if (isPalindrome) {
            outputBox.innerText = "Your Birthday is Palindrome 👼"
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date)
            outputBox.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days.`;
        }
    }
}


function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse('');
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;

    //return str.split('').reverse('').join(''); //This is th shorthand proprty which we above used function.  //
}

//console.log(reverseStr("hello"))

function isPalindrome(str) {
    var reverse = reverseStr(str)
    return str === reverse;
}
//console.log(isPalindrome('mom'))

function convertDateToStr(date) {

    var dateStr = {
        day: '',
        month: '',
        year: ''
    }

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;

}

//var date = {
//    day: 5,
//    month: 9,
//    year: 2020
//}
//console.log(convertDateToStr(date));

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}

function getNextDate(date) {
    var day = date.day + 1; // increase the days
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        //0-11

    //check for february
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++; //increment the month
            }
        } else {
            if (day > 28) {
                day = 1;
                month++ //increment the month 
            }
        }
    } else {
        //check if the day exeeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++; //increment the month
        }
        //increment the year if month is greater than 12
        if (month > 12) {
            month = 1;
            year++;
        }
    }
    return {
        day: day,
        month: month,
        year: year
    };
}


function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    console.log(ctr, nextDate)
    return [ctr, nextDate];
}

showBtn.addEventListener('click', clickHandler)


//var date = {
//    day: 8,
//    month: 8,
//    year: 2021
//}

//checkPalindromeForAllDateFormats(date);
//getNextPalindromeDate(date);


//console.log(getNextDate(date)) // for this 
//15 aug 2021 , 20 feb 2020 ,31 dec 2020 - check for these dates

//console.log(getNextPalindromeDate(date));