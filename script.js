const monthYearElement = document.getElementById("monthYear");
const calendarElement = document.getElementById("calendar");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const eventTitleInput = document.getElementById("eventTitle");
const eventColorInput = document.getElementById("eventColor");
const addEventButton = document.getElementById("addEvent");

let currentDate = new Date();

function renderCalendar() {
    // Clear previous calendar
    calendarElement.innerHTML = "";
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set the month and year display
    monthYearElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Get the first day of the month and number of days in the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Calculate empty days
    const emptyDays = firstDay.getDay();

    // Create empty boxes for days before the first day of the month
    for (let i = 0; i < emptyDays; i++) {
        const emptyDiv = document.createElement("div");
        calendarElement.appendChild(emptyDiv);
    }

    // Create calendar days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.dataset.date = `${year}-${month + 1}-${day}`;

        // Highlight today's date
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
            dayDiv.classList.add("today");
        }

        // Add events
        dayDiv.addEventListener("click", () => showEvents(dayDiv));
        calendarElement.appendChild(dayDiv);
    }
}

function showEvents(dayDiv) {
    const date = dayDiv.dataset.date;
    const events = JSON.parse(localStorage.getItem(date)) || [];
    dayDiv.innerHTML += events.map(event => {
        return `<div class="event" style="background-color: ${event.color};">${event.title}</div>`;
    }).join("");
}

prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

addEventButton.addEventListener("click", () => {
    const title = eventTitleInput.value;
    const color = eventColorInput.value;
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    if (title) {
        const events = JSON.parse(localStorage.getItem(date)) || [];
        events.push({ title, color });
        localStorage.setItem(date, JSON.stringify(events));
        eventTitleInput.value = ""; // Clear input
        renderCalendar();
    }
});

// Initial render
renderCalendar();
