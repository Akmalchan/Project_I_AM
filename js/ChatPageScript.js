document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const wordCount = document.querySelector('.char-count');
    const maxWords = 500;
    const roller = document.getElementById('roller'); // Reference to the roller element
    const container = chatInput.closest('.container'); // Adjust this selector to match your input container
    let isInputFocused = false; // Track if input field is focused

    // Function to update character count
    const updateWordCount = () => {
        // Split input value by spaces, filtering out empty words caused by multiple spaces
        const wordArray = chatInput.value.trim().split(/\s+/).filter(word => word.length > 0);
        const currentWordCount = wordArray.length;
        wordCount.textContent = `${currentWordCount} / ${maxWords}`;
    };

    // Initial word count update
    updateWordCount();

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
        updateWordCount();
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
