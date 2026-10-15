document.querySelectorAll("[data-gmail-local]").forEach((localPartInput) => {
  const form = localPartInput.form;
  const emailInput = form?.querySelector("[data-gmail-address]");

  if (!form || !emailInput) {
    throw new Error("Gmail email field must be inside a form with a matching address input.");
  }

  const updateEmailAddress = () => {
    emailInput.value = localPartInput.value
      ? `${localPartInput.value}@gmail.com`
      : "";
  };

  localPartInput.addEventListener("input", updateEmailAddress);
  form.addEventListener("submit", updateEmailAddress);
});
