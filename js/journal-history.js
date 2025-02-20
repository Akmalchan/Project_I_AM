// Load journal data from localStorage
let journalData = JSON.parse(localStorage.getItem("journalData")) || {};

// Function to render journal history
function renderJournalHistory() {
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "";

    if (Object.keys(journalData).length === 0) {
        historyContainer.innerHTML = "<p>No journal entries yet.</p>";
        return;
    }

    let lastYear = "";

    // Loop through journal data and render each entry
    for (const [monthYear, data] of Object.entries(journalData)) {
        let [month, year] = monthYear.split(" ");

        if (year !== lastYear) {
            let yearHeading = document.createElement("h1");
            yearHeading.classList.add("year-heading");
            yearHeading.textContent = year;
            historyContainer.appendChild(yearHeading);
            lastYear = year;
        }

        let monthSection = document.createElement("section");
        monthSection.classList.add("month-section");
        monthSection.innerHTML = `<h2>${month}</h2>`;

        let journalContainer = document.createElement("div");
        journalContainer.classList.add("journal-container");

        data.entries.forEach((entry, index) => {
            let truncatedText = truncateText(entry.text, 200);
            let isEditable = new Date() < new Date(entry.editableUntil);

            let entryDiv = document.createElement("div");
            entryDiv.classList.add("journal-entry");

            // Create journal entry card with Edit/View buttons
            entryDiv.innerHTML = `
                <p>${truncatedText}</p>
                <span class="entry-date">${formatDate(entry.createdAt)}</span>
                <div class="button-container">
                    ${isEditable ? `
                        <button class="edit-btn" onclick="editEntry('${monthYear}', ${index})">Edit</button>
                        <button class="view-btn" onclick="viewEntry('${monthYear}', ${index})">View</button>
                    ` : `
                        <button class="view-btn full-width" onclick="viewEntry('${monthYear}', ${index})">View</button>
                    `}
                </div>
            `;

            journalContainer.appendChild(entryDiv);
        });

        monthSection.appendChild(journalContainer);
        historyContainer.appendChild(monthSection);
    }
}

// Truncate text function
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Format date for display
function formatDate(isoString) {
    let date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

// Handle Edit button
function editEntry(monthYear, index) {
    const entry = journalData[monthYear].entries[index];
    alert(`Editing entry: ${entry.text}`);
}

// Handle View button
function viewEntry(monthYear, index) {
    const entry = journalData[monthYear].entries[index];
    alert(`Viewing entry: ${entry.text}`);
}

// Initial render on page load
document.addEventListener("DOMContentLoaded", renderJournalHistory);
