const importanceButton = document.getElementById("importance-button");
const importanceDetails = document.getElementById("importance-details");

importanceButton.addEventListener("click", function () {
    const isExpanded = importanceButton.getAttribute("aria-expanded") === "true";

    importanceButton.setAttribute("aria-expanded", String(!isExpanded));
    importanceDetails.hidden = isExpanded;
    importanceButton.querySelector(".button-icon").textContent = isExpanded ? "＋" : "−";
});