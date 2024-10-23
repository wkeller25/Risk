const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentDay = new Date().getDate();

const monthYear = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const eventModal = document.getElementById("eventModal");
const eventDay = document.getElementById("eventDay");
const addEventBtn = document.getElementById("addEventBtn");
const createCategoryBtn = document.getElementById("createCategoryBtn");
const categoryModal = document.getElementById("categoryModal");
const closeCategory = document.querySelector(".closeCategory");
const currentDayMarker = document.getElementById("currentDayMarker");

// Categories array to hold event categories
let categories = [{name: "Work", color: "#ff6666"}, {name: "Personal", color: "#66cc66"}];

// Function to render the calendar
function renderCalendar() {
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendarBody.innerHTML = ""; // Clear the calendar body

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Fill in the empty cells before the first day
    const emptyCells = firstDay.getDay();
    for (let i = 0; i < emptyCells; i++) {
        calendarBody.innerHTML += "<td class='empty'></td>";
    }

    // Create the day cells
    for (let day = 1; day <= daysInMonth; day++) {
        calendarBody.innerHTML += `<td class="day" data-day="${day}">${day}</td>`;
    }

    // Mark the current day
    const dayCells = document.querySelectorAll(".day");
    dayCells.forEach(cell => {
        if (parseInt(cell.dataset.day) === currentDay && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
            cell.classList.add("today");
            currentDayMarker.style.display = "block";
        }
    });
}

// Function to show the event modal
function showEventModal(day) {
    eventModal.style.display = "block";
    eventDay.textContent = day;
}

// Event listeners
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("day")) {
        showEventModal(event.target.dataset.day);
    }
});

document.getElementById("prevMonth").onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
};

// Add event button
addEventBtn.onclick = () => {
    const title = document.getElementById("eventTitle").value;
    const category = document.getElementById("eventCategory").value;
    alert(`Event Added: ${title} on ${eventDay.textContent} in ${category}`);
    eventModal.style.display = "none";
};

// Create category button
createCategoryBtn.onclick = () =>
