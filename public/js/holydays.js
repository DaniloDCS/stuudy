function createElement(name, attributes = {}, othersAttributes = {}) {
  const element = document.createElement(name);

  if (Object.keys(attributes).length > 0) Object.keys(attributes).forEach(attribute => element[attribute] = attributes[attribute]);

  if (Object.keys(othersAttributes).length > 0) Object.keys(othersAttributes).forEach(attribute => element.setAttribute(attribute, othersAttributes[attribute]));

  return element;
}

const days = Array.from({ length: 7 }).map((day, index) => {
  let string = new Date(2023, 0, index + 1).toLocaleDateString("pt-BR", { weekday: "short" });
  return string.charAt(0).toUpperCase() + string.slice(1);
});

const months = Array.from({ length: 12 }).map((month, index) => {
  let string = new Date(2023, index, 1).toLocaleDateString("pt-BR", { month: "long" });
  return string.charAt(0).toUpperCase() + string.slice(1);
});

function calculateQuantityOfDaysCurrentBeforeAndAfter(d = new Date()) {
  const date = new Date(d),
    current = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    before = new Date(date.getFullYear(), date.getMonth(), 0).getDate() - date.getDay() + 1,
    after = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate(),
    firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
    quantityWeeks = Math.ceil((current + firstDayOfCurrentMonth) / 7),
    currentWeek = Math.ceil((date.getDate() + firstDayOfCurrentMonth) / 7);

  return { current, before, after, quantityWeeks, firstDayOfCurrentMonth, currentWeek };
}

const calendarView = document.querySelector("#calendar"),
  calendarDetails = document.querySelector("#calendar-details");

function calendar(date) {
  calendarView.innerHTML = "";
  calendarDetails.innerHTML = "";
  date = new Date(date);

  const holidays = getHolidays(date.getFullYear());
  const currentMonthHolidays = holidays[date.toLocaleDateString("pt-BR", { month: "short" })];

  currentMonthHolidays.sort((a, b) => Number(a.date) - Number(b.date));

  const calendar = createElement("table", { className: "calendar" }),
    calendarHeader = createElement("thead", { className: "calendar-header" }),
    calendarBody = createElement("tbody", { className: "calendar-body" }),
    calendarHeaderRow = createElement("tr", { className: "calendar-header-row" }),
    calendarBodyRow = createElement("tr", { className: "calendar-body-row" });

  const calendarHeaderMonth = createElement("th", { className: "calendar-header-month", innerText: `${months[date.getMonth()]}, ${date.getFullYear()}` }, { colspan: "5" });
  const calendarNextMonth = createElement("th", { className: "calendar-next-month", innerHTML: '<i class="fas fa-circle-arrow-right"></i>' }, { onclick: `calendar('${new Date(date.getFullYear(), date.getMonth() + 1, 1)}')` });
  const calendarBackMonth = createElement("th", { className: "calendar-back-month", innerHTML: '<i class="fas fa-circle-arrow-left"></i>' }, { onclick: `calendar('${new Date(date.getFullYear(), date.getMonth() - 1, 1)}')` });

  calendarHeaderRow.append(calendarHeaderMonth, calendarBackMonth, calendarNextMonth);
  calendarHeader.appendChild(calendarHeaderRow);

  days.forEach(day => {
    const calendarBodyDay = createElement("th", { className: "calendar-header-day" });
    calendarBodyDay.textContent = day;
    calendarBodyRow.appendChild(calendarBodyDay);
  });

  calendarBody.appendChild(calendarBodyRow);

  const quantity = calculateQuantityOfDaysCurrentBeforeAndAfter(date),
    firstDayOfCurrentMonth = quantity.firstDayOfCurrentMonth,
    currentMonthDaysTotal = quantity.current,
    currentWeek = quantity.currentWeek;

  let daysBefore = quantity.before,
    daysCurrent = 1,
    daysAfter = 1,
    count = 0,
    quantityWeeks = quantity.quantityWeeks;

  for (let week = 0; week < quantityWeeks; week++) {
    const calendarRow = createElement("tr", { className: "calendar-row" });

    if (week === currentWeek - 1 && new Date().getMonth() === date.getMonth()) calendarRow.classList.add("calendar-row-current");

    for (let day = 0; day < 7; day++) {
      let innerText = "",
        className = "",
        ariaLabel = "";

      if (count < firstDayOfCurrentMonth) {
        innerText = daysBefore;
        className = "calendar-day-before";
        daysBefore++;
      } else if (count >= firstDayOfCurrentMonth && daysCurrent <= currentMonthDaysTotal) {
        innerText = daysCurrent;
        if (daysCurrent === new Date().getDate()) className = "calendar-day-current";
        else className = "calendar-day";

        currentMonthHolidays.forEach(holiday => {
          if (holiday.date == innerText) {
            className += " " + holiday.type
            innerText += " <span>" + holiday.title + "</span>"
            const details = createElement("li", { "class-name": "details", innerHTML: `${daysCurrent}| ${holiday.title}` })
            calendarDetails.append(details);
          }
        });

        daysCurrent++;
      } else if (daysCurrent >= currentMonthDaysTotal) {
        innerText = daysAfter;
        className = "calendar-day-after";
        daysAfter++;
      }

      const calendarDay = createElement("td", { className, innerHTML: innerText }, ariaLabel);
      calendarRow.appendChild(calendarDay);
      count++;
    }

    calendarBody.appendChild(calendarRow);
  }

  calendar.append(calendarHeader, calendarBody);
  calendarView.appendChild(calendar);
}

calendar(new Date());

function getHolidays(year) {
  const holidays = {
    "jan.": [
      {
        "date": "1",
        "title": "Ano Novo",
        "info": "",
        "type": "holiday"
      }
    ],
    "fev.": [],
    "mar.": [
      {
        "date": "8",
        "title": "Dia Internacional da Mulher",
        "info": "",
        "type": "commemoration"
      }
    ],
    "abr.": [
      {
        "date": "21",
        "title": "Tiradentes",
        "info": "",
        "type": "holiday"
      }
    ],
    "mai.": [
      {
        "date": "1",
        "title": "Dia do Trabalhador",
        "info": "",
        "type": "holiday"
      },
      {
        "date": secondSundayOfMonth(year, 5),
        "title": "Dia das Mães",
        "info": "",
        "type": "holiday"
      }
    ],
    "jun.": [
      {
        "date": "12",
        "title": "Dia dos Namorados",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "24",
        "title": "São João",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "29",
        "title": "São Pedro e São Paulo",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "19",
        "title": "Dia de São João Batista",
        "info": "",
        "type": "holiday"
      }
    ],
    "jul.": [
      {
        "date": "25",
        "title": "Nossa Senhora do Carmo",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "16",
        "title": "Dia de São Cristóvão",
        "info": "",
        "type": "holiday"
      }
    ],
    "ago.": [
      {
        "date": secondSundayOfMonth(year, 8),
        "title": "Dia dos Pais",
        "info": "",
        "type": "holiday"
      }
    ],
    "set.": [
      {
        "date": "7",
        "title": "Dia da Independência do Brasil",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "21",
        "title": "Dia da Árvore",
        "info": "",
        "type": "commemoration"
      }
    ],
    "out.": [
      {
        "date": "12",
        "title": "Nossa Senhora Aparecida",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "15",
        "title": "Dia do Professor",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "28",
        "title": "Dia do Servidor Público",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "31",
        "title": "Dia das Bruxas",
        "info": "",
        "type": "holiday"
      }
    ],
    "nov.": [
      {
        "date": "2",
        "title": "Finados",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "15",
        "title": "Proclamação da República",
        "info": "",
        "type": "holiday"
      },
      {
        "date": "20",
        "title": "Dia da Consciência Negra",
        "info": "",
        "type": "commemoration"
      }
    ],
    "dez.": [
      {
        "date": "25",
        "title": "Natal",
        "info": "",
        "type": "holiday"
      }, {
        "date": "24",
        "title": "Véspera de Natal",
        "info": "",
        "type": "holiday"
      }, {
        "date": "31",
        "title": "Véspera de Ano Novo",
        "info": "",
        "type": "holiday"
      }
    ]
  };

  // Set carnaval
  const carnaval = new Date(getCarnaval(year));



  holidays[carnaval.toLocaleString("pt-BR", { month: "short" })].push({
    date: carnaval.getDate(),
    title: "Carnaval",
    info: "",
    type: "holiday"
  });

  holidays[carnaval.toLocaleString("pt-BR", { month: "short" })].push({
    date: carnaval.getDate() + 1,
    title: "Quarta-feira de Cinzas",
    info: "",
    type: "holiday"
  });

  // set pascoa
  const pascoa = new Date(getPascoa(year));

  holidays[pascoa.toLocaleString("pt-BR", { month: "short" })].push({
    date: pascoa.getDate(),
    title: "Domingo de Páscoa",
    info: "",
    type: "holiday"
  });

  // set corpus christi
  const corpusChristi = new Date(getCorpusChristi(year));

  holidays[corpusChristi.toLocaleString("pt-BR", { month: "short" })].push({
    date: corpusChristi.getDate(),
    title: "Corpus Christi",
    info: "",
    type: "holiday"
  });

  // set sexta santa
  const sextaSanta = new Date(getSextaSanta(year));

  holidays[sextaSanta.toLocaleString("pt-BR", { month: "short" })].push({
    date: sextaSanta.getDate(),
    title: "Sexta-feira Santa",
    info: "",
    type: "holiday"
  });

  // set domingo de ramos
  const domingoDeRamos = new Date(getPascoa(year));

  holidays[domingoDeRamos.toLocaleString("pt-BR", { month: "short" })].push({
    date: domingoDeRamos.getDate() - 7,
    title: "Domingo de Ramos",
    info: "",
    type: "holiday"
  });

  return holidays;
}

function secondSundayOfMonth(year, month) {
  let date = "",
    day = 0,
    sum = 1,
    aux = true;

  while (aux) {
    let d = new Date(year, month - 1, sum);
    if (Number(d.getDay()) === 0) day++;
    if (day === 2) {
      date = d.getDate();
      aux = false;
    }

    sum++;

    if (sum > 31) break;
  }

  return date;
}

const getJulianDate = (date = new Date()) => {
  const time = date.getTime();
  const tzo = date.getTimezoneOffset();

  return (time / 86400000) - (tzo / 1440) + 2440587.5;
}

const lunarMonth = 29.530588853;

const getLunarAgr = (date = new Date()) => {
  const percent = getLunarAgePercent(date);
  const age = percent * lunarMonth;
  return age;
}

const getLunarAgePercent = (date = new Date()) => {
  return normalize((getJulianDate(date) - 2451550.1) / lunarMonth);
}

const normalize = (agr) => {
  agr = agr - Math.floor(agr);

  if (agr < 0) agr += 1;

  return agr;
}

const getPhaseMoon = (date = new Date()) => {
  const agr = getLunarAgr(date);

  if (agr < 1.84566) return "Lua Nova";
  else if (agr < 5.53699) return "Lua Crescente";
  else if (agr < 9.22831) return "Lua Quarto Crescente";
  else if (agr < 12.91963) return "Lua Crescente Gibosa";
  else if (agr < 16.61096) return "Lua Cheia";
  else if (agr < 20.30228) return "Lua Minguante Gibosa";
  else if (agr < 23.99361) return "Lua Quarto Minguante";
  else if (agr < 27.68493) return "Lua Minguante";
  else return "Lua Nova";
}

function getPascoa(year) {
  var a = year % 19;
  var b = Math.floor(year / 100);
  var c = year % 100;
  var d = Math.floor(b / 4);
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3);
  var h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = (32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31);
  var day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

function getCorpusChristi(year) {
  var pascoa = getPascoa(year);
  var date = new Date(pascoa.getTime());
  date.setDate(date.getDate() + 60);

  return date;
}

function getSextaSanta(year) {
  var pascoa = getPascoa(year);
  var date = new Date(pascoa.getTime());
  date.setDate(date.getDate() - 2);

  return date;
}

function getCarnaval(year) {
  var pascoa = getPascoa(year);

  var date = new Date(pascoa.getTime());
  date.setDate(date.getDate() - 47);

  return date;
}