import { calendar } from "../../config/mongoCollections";

function generateCalendar(){
    const now = Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMoonth, 1);
    // finding 0th day of next month to get last day of current month
    const lastDayOfMonth = new Date(curentYear, currentMonth + 1, 0 );

    // going for the Canvas-like calendar view
    const startDayOfWeek = firstDayOfMonth.getDay();
    const endDayOfWeek = lastDayOfMonth.getDay(); 

    let calendarHTML = '';
    let date = 1 - startDayOfMonth; 

    document.getElementById('month-year').innerText = `${now.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    for (let i = 0; i < 6; i++) { 
        let weekRow = '<tr>';
        for (let j = 0; j < 7; j++, date++) {
            if (date < 1) {
                let prevMonthDay = new Date(currentYear, currentMonth, date).getDate();
                weekRow += `<td class="not-current-month">${prevMonthDay}</td>`;
            } else if (date > daysInMonth) {
                let nextMonthDay = date - daysInMonth;
                weekRow += `<td class="not-current-month">${nextMonthDay}</td>`;
            } else {
                weekRow += `<td>${date}</td>`;
            }
        }
        weekRow += '</tr>';
        calendarHTML += weekRow;
    }

    document.querySelector('#calendar tbody').innerHTML = calendarHTML;
};