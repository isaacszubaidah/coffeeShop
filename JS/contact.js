
function getCurrentYear() {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    document.getElementById("currentYear").innerText = currentYear;
  } catch (error) {
    alert("Error during getCurrentYear:", error);
  
  
  // Call the function to set the current year when the page loads
  getCurrentYear();
}
};

