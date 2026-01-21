export const validateQuantity = (quantity) => {
  const num = Number(quantity);

  if (isNaN(num)) {
    return {
      isValid: false,
      message: "Please enter a valid number"
    };
  }

  if (!Number.isInteger(num)) {
    return {
      isValid: false,
      message: "Quantity must be a whole number"
    };
  }

  if (num < 1) {
    return {
      isValid: false,
      message: "Quantity must be at least 1"
    };
  }

  if (num > 99) {
    return {
      isValid: false,
      message: "Maximum quantity is 99"
    };
  }

  return {
    isValid: true,
    message: ""
  };
};

export const showFeedbackMessage = (message, isError = true) => {
  const feedbackDiv = document.getElementById('cart-feedback') || createFeedbackElement();
  feedbackDiv.textContent = message;
  feedbackDiv.className = `cart-feedback ${isError ? 'error' : 'success'}`;
  feedbackDiv.style.display = 'block';

  setTimeout(() => {
    feedbackDiv.style.display = 'none';
  }, 3000);
};
