document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const wordCount = document.querySelector('.char-count');
    const sendButton = document.getElementById('send-button');
    const maxWords = 500;
    const roller = document.getElementById('roller'); 
    const container = chatInput.closest('.container');
    let isInputFocused = false;

    // Update word count
    const updateWordCount = () => {
        const wordArray = chatInput.value.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = `${wordArray.length} / ${maxWords}`;
    };

    updateWordCount();

    // Focus event to expand input
    chatInput.addEventListener('focus', () => {
        chatInput.classList.add('expanded');
        roller.style.display = 'none';
        isInputFocused = true;
    });

    // Blur event to reset focus
    chatInput.addEventListener('blur', () => {
        isInputFocused = false;
    });

    // Update word count on input
    chatInput.addEventListener('input', updateWordCount);

    // Hide roller if clicking outside
    document.addEventListener('click', (event) => {
        if (!container.contains(event.target) && !isInputFocused) {
            roller.style.display = 'none';
        }
    });

    // Send button functionality
    sendButton.addEventListener('click', () => {
        const userInput = chatInput.value.trim();

        if (userInput) {
            saveJournalEntry(userInput);
            chatInput.value = "";
            updateWordCount();
            alert("Journal entry saved successfully!");
        } else {
            alert("Please enter some text before ending the note.");
        }
    });

    // Function to save journal entry to localStorage
    function saveJournalEntry(text) {
        const now = new Date();
        const currentMonth = now.toLocaleString("default", { month: "long" });
        const currentYear = now.getFullYear();
        const monthYearKey = `${currentMonth} ${currentYear}`;

        let journalData = JSON.parse(localStorage.getItem("journalData")) || {};

        // Create the month if it doesn't exist
        if (!journalData[monthYearKey]) {
            journalData[monthYearKey] = { entries: [] };
        }

        // Create new entry object
        const newEntry = {
            text: text,
            createdAt: now.toISOString(),
            editableUntil: new Date(now.getTime() + 15 * 60000).toISOString() // 15 min later
        };

        // Add the new entry at the beginning of the array
        journalData[monthYearKey].entries.unshift(newEntry);

        // Save to localStorage
        localStorage.setItem("journalData", JSON.stringify(journalData));
    }
});
