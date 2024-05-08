
function generateCalendar(year, month) {
    const now = new Date(year, month);
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const monthYearDisplay = `${now.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    document.getElementById('month-year').innerText = monthYearDisplay

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    let date = 1 - startDayOfWeek;
    let calendarHTML = '';

    for (let i = 0; i < 6; i++) {
        let weekRow = '<tr>';
        for (let j = 0; j < 7; j++, date++) {
            if (date < 1) {
                const prevMonthDay = new Date(currentYear, currentMonth, date).getDate();
                weekRow += `<td class="not-current-month">${prevMonthDay}</td>`;
            } else if (date > daysInMonth) {
                const nextMonthDay = date - daysInMonth;
                weekRow += `<td class="not-current-month">${nextMonthDay}</td>`;
            } else {
                weekRow += `<td>${date}</td>`;
            }
        }
        weekRow += '</tr>';
        calendarHTML += weekRow;
    }

    document.querySelector('#calendar tbody').innerHTML = calendarHTML;

}

document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    generateCalendar(now.getFullYear(), now.getMonth());

    document.getElementById('prev-month').addEventListener('click', () => {
        const [month, year] = document.getElementById('month-year').textContent.split(' ');
        generateCalendar(parseInt(year), new Date(`${month} 1, ${year}`).getMonth() - 1);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        const [month, year] = document.getElementById('month-year').textContent.split(' ');
        generateCalendar(parseInt(year), new Date(`${month} 1, ${year}`).getMonth() + 1);
    });
});