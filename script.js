const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");
console.log(savedDate);

const intervalIdArr = [];

const dateFormMaker = () => {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  //템플릿 리터럴
  //hi
  return dateFormat;
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMaker = function (data) {
  if (data !== savedDate) {
  }
  localStorage.setItem("saved-date", data);
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  //ms로 출력되기 때문에 1000으로 나눠줘야함
  const remaining = (targetDate - nowDate) / 1000;
  //remaining 이 0 아래라면, 타이머가 종료되었습니다 출력
  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    //잘못된 값이 들어오면 아래 계산하는 코드를 실행시킬 필요없기 때문에 종료시켜준다.
    return;
  } else if (isNaN(remaining)) {
    // nan은 '==='로 비교 불가.
    //잘못된 날짜가 들어왓다면, 유효한 시간대가 아닙니다 출력.
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    //잘못된 값이 들어오면 아래 계산하는 코드를 실행시킬 필요없기 때문에 종료시켜준다.
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    //배열에서 쓰는 for-of 문
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
  /*
  const documentObj = { 
    //위의 for-of 문으로 인해 필요 없어짐
    days: document.querySelector("#days"),
    hours: document.querySelector("#hours"),
    min: document.querySelector("#min"),
    sec: document.querySelector("#sec"),
  };

  //객체에서 쓰는 for-in문
  let i = 0;
  for (let key in documentObj) {
    // 여기서 key는 명시적인 이름이며, 다른 단어로 해도 객체의 key를 받아온다.
    documentObj[key].textContent = remainingObj[timeKeys[i]];
    i++;
  }
*/
};

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex"; // none -> flex
  messageContainer.style.display = "none";
  setClearInterval();

  counterMaker(targetDateInput); // setinterval이 '1초뒤에'실행되기 때문에 한번 실행시켜줌

  //intervalId에 인터벌ID를 담는동시에 setInterval() 함수 호출
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000); //인자가 있는 함수를 setInterval 안세서 쓰려면, 익명화살표함수 사용
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
    //인터벌id에 해당하는 인터벌을 삭제하는 것이지, 배열요소를 삭제하는 것이 아님.
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};

if (savedDate) {
  //괄호 안이 truthy한 경우에도 실행됨
  //falsy: undefined, null, 0 , "", NaN
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
}
