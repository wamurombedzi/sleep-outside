const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Thanks for subscribing! 🎉";
    message.style.color = "green";

    emailInput.value = "";
});
