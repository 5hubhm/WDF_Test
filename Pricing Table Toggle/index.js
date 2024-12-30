document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleSwitch");
    const prices = document.querySelectorAll(".price");

    toggleSwitch.addEventListener("change", () => {
        const isYearly = toggleSwitch.checked;
        prices.forEach(price => {
            const newPrice = isYearly ? price.dataset.yearly : price.dataset.monthly;
            price.textContent = newPrice;
        });
    });
});
