
const localeSettings = {};
  dayjs.locale(localeSettings);

  $(function () {
    // Get the current hour of the day using the dayjs library.
const currentHour = dayjs().format('H');

// Function to change the color of each time block based on whether it's in the past, present, or future.
function updateBlockColor(block, blockHour) {
  block.toggleClass('past', blockHour < currentHour);
  block.toggleClass('present', blockHour === currentHour);
  block.toggleClass('future', blockHour > currentHour);
}

// Function to save user input in localStorage when the save button is clicked.
function saveUserInput() {
  $('.saveBtn').on('click', function() {
    const key = $(this).parent().attr('id');
    const value = $(this).siblings('.description').val();
    localStorage.setItem(key, value);
  });
}

// Function to refresh the color of each time block based on the current time.
function refreshBlockColors() {
  $('.time-block').each(function() {
    const blockHour = parseInt(this.id);
    if (blockHour == currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
}

// Function to set textarea values for each time block from localStorage.
function setSavedInputs() {
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });
}

// Function to update the displayed date and time every second.
function updateTime() {
  const dateElement = $('#date');
  const timeElement = $('#time');
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');
  const currentTime = dayjs().format('hh:mm:ss A');
  dateElement.text(currentDate);
  timeElement.text(currentTime);
}

// Call the necessary functions to set up the page.
function setupPage() {
  saveUserInput();
  setSavedInputs();
  refreshBlockColors();
  updateTime();
  setInterval(updateTime, 1000); // Update time every second
}

$(document).ready(function() {
  setupPage();
});
})
   
