function generateCalndar(){
    const now = Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMoonth, 1);
    // finding 0th day of next month
    const lastDayOfMonth = new Date(curentYear, currentMonth + 1, 0 );

    // going for the Canvas-like calendar view
    const startDayOfMonth = firstDayOfMonth.getDay();
    const endDayOfMonth = lastDayOfMonth.getDay(); 

    let calendarHTML = '';
    let date = 1 - startDayOfWeek; 

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
    }
}