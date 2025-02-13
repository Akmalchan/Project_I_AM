document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const charCount = document.querySelector('.char-count');
    const roller = document.getElementById('roller'); // Reference to the roller element
    const container = chatInput.closest('.container'); // Adjust this selector to match your input container
    let isInputFocused = false; // Track if input field is focused

    // Function to update character count
    const updateCharCount = () => {
        charCount.textContent = `${chatInput.value.length} / 3000`;
    };

    // Initial character count update
    updateCharCount();

    // Add focus event listener to handle height expansion and hide roller
    chatInput.addEventListener('focus', () => {
        if (!chatInput.classList.contains('expanded')) {
            chatInput.classList.add('expanded');
        }
        roller.style.display = 'none'; // Hide the roller animation
        isInputFocused = true; // Mark that the input is focused
    });

    // Add blur event listener to reset focus flag
    chatInput.addEventListener('blur', () => {
        isInputFocused = false; // Mark that the input is no longer focused
    });

    // Add input event listener to update character count and hide roller
    chatInput.addEventListener('input', () => {
        updateCharCount();
        // Hide roller animation as long as user is typing
        if (chatInput.value.trim()) {
            roller.style.display = 'none';
        }
    });

    // Add document click listener to hide the roller only when clicking outside the container
    document.addEventListener('click', (event) => {
        const clickedInsideContainer = container.contains(event.target);
        if (!clickedInsideContainer && !isInputFocused) {
            roller.style.display = 'none'; // Keep the roller hidden when clicking outside
        }
    });
});
