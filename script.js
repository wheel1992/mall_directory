const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxZ6mHILVCTLiFkK0xtZvVRadMBskPlDW3xNOt2lOAeI-yhBV3Y-KRpgk_klcuytU8s/exec";

const form = document.getElementById("interest-form");
const statusEl = document.getElementById("form-status");

const setStatus = (message, isError = false) => {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#c0392b" : "#3b3f52";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!FORM_ENDPOINT) {
    setStatus("Email capture is not connected yet. Check back soon!", true);
    return;
  }

  const email = new FormData(form).get("email");
  setStatus("Sending...");

  try {
    const payload = new URLSearchParams({
      email,
      timestamp: new Date().toISOString(),
    });

    await fetch(FORM_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: payload.toString(),
    });

    form.reset();
    setStatus("Thanks! We will reach out soon.");
  } catch (error) {
    setStatus("Something went wrong. Please try again.", true);
  }
});
