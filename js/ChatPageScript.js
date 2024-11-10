document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById('chat-input');
    const charCount = document.querySelector('.char-count');

    // Function to adjust the height of the input field and container
    const adjustHeight = () => {
        inputField.style.height = 'auto'; // Reset height to auto so it can shrink and grow
        inputField.style.height = `${inputField.scrollHeight}px`; // Set the height to the scrollHeight (content height)

        // Update character count
        charCount.textContent = `${inputField.value.length} / 3000`;
    };

    // Initial height adjustment
    adjustHeight();

    // Adjust height on input event
    inputField.addEventListener('input', adjustHeight);
});
