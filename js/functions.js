const getTimeTransformMinutes = (time) => +time.split(':')[0] * 60 + +time.split(':')[1];

const checkWorkerTime = (
  startWorkDay,
  endWorkDay,
  startMeeting,
  durationMeeting
) => {
  const startWorkDayTransformMinutes = getTimeTransformMinutes(startWorkDay);
  const endWorkDayTransformMinutes = getTimeTransformMinutes(endWorkDay);
  const startMeetingTransformMinutes = getTimeTransformMinutes(startMeeting);

  if (startWorkDayTransformMinutes > startMeetingTransformMinutes ||
    endWorkDayTransformMinutes < startMeetingTransformMinutes ||
    endWorkDayTransformMinutes < startMeetingTransformMinutes + durationMeeting
  ) {
    return false;
  }
  return true;
};


/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
console.log(checkWorkerTime('08:00', '17:30', '14:00', 90)); // true
console.log(checkWorkerTime('8:0', '10:0', '8:0', 120)); // true
console.log(checkWorkerTime('08:00', '14:30', '14:00', 90)); // false
console.log(checkWorkerTime('14:00', '17:30', '08:0', 90)); // false
console.log(checkWorkerTime('8:00', '17:30', '08:00', 900)); // false
