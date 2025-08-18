const inputes = document.querySelectorAll('input[type="checkbox"]');
const checkboxGood = document.querySelector("#good");
const checkboxCheap = document.querySelector("#cheap");
const checkboxFast = document.querySelector("#fast");

inputes.forEach((el) => {
  el.addEventListener("change", doTheTrick);
});

function doTheTrick() {
  if (
    !checkboxGood.checked ||
    !checkboxCheap.checked ||
    !checkboxFast.checked
  ) {
    return;
  }

  if (checkboxCheap.checked && checkboxFast.checked) {
    checkboxCheap.click();
  }
  if (checkboxGood.checked && checkboxFast.checked) {
    checkboxFast.click();
  }
  if (checkboxGood.checked && checkboxCheap.checked) {
    checkboxCheap.click();
  }
}
