// ----------------календарь-------------
export default function calendar(id, year, month) {
  const monthNew = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  let calendarNew = '<tr>';
  const Dlast = new Date(year, month + 1, 0).getDate();
  const D = new Date(year, month, Dlast);
  const DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
  const DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
  if (DNfirst !== 0) {
    for (let i = 1; i < DNfirst; i += 1) calendarNew += '<td>';
  } else {
    for (let i = 0; i < 6; i += 1) calendarNew += '<td>';
  }
  for (let i = 1; i <= Dlast; i += 1) {
    if (i === new Date().getDate() && D.getFullYear()
      === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
      calendarNew += `<td class="today">${i}`;
    } else {
      calendarNew += `<td>${i}`;
    }
    if (new Date(D.getFullYear(), D.getMonth(), i).getDay() === 0) {
      calendarNew += '<tr>';
    }
  }
  for (let i = DNlast; i < 7; i += 1) calendarNew += '<td> ';
  document.querySelector(`#${id} tbody`).innerHTML = calendarNew;
  document.querySelector(`#${id} thead td:nth-child(2)`).innerHTML = `${monthNew[D.getMonth()]} ${D.getFullYear()}`;
  document.querySelector(`#${id} thead td:nth-child(2)`).dataset.month = D.getMonth();
  document.querySelector(`#${id} thead td:nth-child(2)`).dataset.year = D.getFullYear();
  if (document.querySelectorAll(`#${id} tbody tr`).length < 6) {
    document.querySelector(`#${id} tbody`).innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
  }
}
calendar('calendar', new Date().getFullYear(), new Date().getMonth());
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
  calendar('calendar', document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
};
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
  calendar('calendar', document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
};

const calender = document.querySelector('.calender-image');
calender.addEventListener('click', () => {
  document.querySelector('.funny-wrapper').classList.toggle('inactive');
});
