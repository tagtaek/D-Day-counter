const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");

//container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";

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

const counterMaker = function () {
  const targetDateInput = dateFormMaker();
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  //ms로 출력되기 때문에 1000으로 나눠줘야함
  const remaining = (targetDate - nowDate) / 1000;
  //remaining 이 0 아래라면, 타이머가 종료되었습니다 출력
  if (remaining <= 0) {
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
  } else if (isNaN(remaining)) {
    // nan은 '==='로 비교 불가.
    //잘못된 날짜가 들어왓다면, 유효한 시간대가 아닙니다 출력.
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentObj = {
    days: document.querySelector("#days"),
    hours: document.querySelector("#hours"),
    min: document.querySelector("#min"),
    sec: document.querySelector("#sec"),
  };

  documentObj.days.textContent = remainingObj.remainingDate;
  documentObj.hours.textContent = remainingObj.remainingHours;
  documentObj.min.textContent = remainingObj.remainingMin;
  documentObj.sec.textContent = remainingObj.remainingSec;

  // console.log(remainingDate, remainingHours, remainingMin, remainingSec);
};
