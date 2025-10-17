// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('numberForm');
  const input = document.getElementById('numberInput');
  const displayDiv = document.getElementById('numberDisplay');
  const statusMessage = document.getElementById('statusMessage');
  const resetButton = document.getElementById('resetButton');

  // Function to create number items
  function displayNumbers() {
    displayDiv.innerHTML = '';
    for (let i = 1; i <= 100; i++) {
      const item = document.createElement('div');
      item.className = 'number-item';
      item.textContent = i;
      displayDiv.appendChild(item);
    }
  }

  // Initial display of numbers
  displayNumbers();

  // Helper function to validate input
  function validateInput() {
    const value = input.value.trim();
    if (value === '') {
      setStatus('Please enter a number.', true);
      input.setAttribute('aria-invalid', 'true');
      return false;
    }
    const number = Number(value);
    if (isNaN(number) || number < 1 || number > 100) {
      setStatus('Number must be between 1 and 100.', true);
      input.setAttribute('aria-invalid', 'true');
      return false;
    }
    input.setAttribute('aria-invalid', 'false');
    return true;
  }

  // Function to update status message
  function setStatus(message, isError) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? '#ff5555' : '#00ff55';
  }

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const num = Number(input.value.trim());
    highlightNumber(num);
    setStatus('Number ' + num + ' highlighted.', false);
  });

  // Highlight specific number
  function highlightNumber(number) {
    const items = displayDiv.children;
    for (let item of items) {
      if (parseInt(item.textContent) === number) {
        item.style.backgroundColor = '#33a';
        item.style.transform = 'scale(1.2)';
        // Animate back to normal
        setTimeout(() => {
          item.style.backgroundColor = '#222';
          item.style.transform = 'scale(1)';
        }, 300);
        break;
      }
    }
  }

  // Reset button handler
  resetButton.addEventListener('click', function() {
    // Clear input
    input.value = '';
    input.setAttribute('aria-invalid', 'false');
    setStatus('Reset complete.', false);
    // Remove any highlight styles
    const items = displayDiv.children;
    for (let item of items) {
      item.style.backgroundColor = '#222';
      item.style.transform = 'scale(1)';
    }
  });

  // Optional: allow pressing Enter to submit
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      form.dispatchEvent(new Event('submit'));
    }
  });
});