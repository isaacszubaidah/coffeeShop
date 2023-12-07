function getCurrentYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  document.getElementById('currentYear').innerText = currentYear;
}

// Call the function to set the current year when the page loads
getCurrentYear();