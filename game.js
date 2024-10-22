/**
 * AD 320 Game Exercise
 *
 * This java script file is attached to index.html. It helps create the
 * functions that make the website interactive and able to play a game. Using
 * functions on this page we can switch game views and get a timer going.
 */
"use strict";

(function() {
  // Magic numbers
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const ONE_MINUTE = 60;
  const THREE_MINUTES = 180;
  const FIVE_MINUTES = 300;
  const ONE_THOUSAND_MS = 1000;

  let timerId;
  let remainingSeconds;

  /**
   * Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * init() initializes all the surface level buttons to have event listeners.
   * These buttons include start-btn and back-btn.
   */
  function init() {
    id("start-btn").addEventListener("click", startGame);
    id("back-btn").addEventListener("click", endGame);
  }

  /**
   * Calls the chain of functions for when the start-btn is clicked. startGame()
   * starts the timer, toggles the screen, and populates the new board.
   */
  function startGame() {
    startTimer();
    toggleViews();
  }

  /**
   * endGame() is what happens when the back-btn is clicked. We first clear the
   * timerId, then clear the board, then set the count of sets to be 0, and
   * finally we toggle the view back to the menu view.
   */
  function endGame() {
    clearInterval(timerId);
    toggleViews();
  }

  /**
   * Used to switch between the menu view and game view of the game. This is
   * done with clicking the #start-btn and #back-btn.
   */
  function toggleViews() {
    id("menu-view").classList.toggle("hidden");
    id("game-view").classList.toggle("hidden");
  }

  /**
   * Starts the timer for a new game. Here we initialize timerId by calling
   * setInterval and set remainingSeconds. We also initialize the beginning
   * time value for when the page just begins couting down.
   */
  function startTimer() {
    remainingSeconds = qs("select").value;

    if (parseInt(remainingSeconds) === ONE_MINUTE) {
      id("time").textContent = "01:00";
    } else if (parseInt(remainingSeconds) === THREE_MINUTES) {
      id("time").textContent = "03:00";
    } else if (parseInt(remainingSeconds) === FIVE_MINUTES) {
      id("time").textContent = "05:00";
    }

    timerId = setInterval(advanceTimer, ONE_THOUSAND_MS);
  }

  /**
   * Updates the game timer by 1 second. Here we also make sure that the time
   * follows the MM:SS format. When the time is up (less than 0), we clear the
   * timerId.
   */
  function advanceTimer() {
    // TODO
    // Implement the advanceTimer() method so it matches the function description above.
    // Do NOT use magic numbers in your code. Constants are defined at the top
    // of this file for your use.
    // id("time");
    remainingSeconds--;
    if (remainingSeconds < 0) {
        clearInterval(timerId);
    } else {
        let minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
        let seconds = remainingSeconds % SECONDS_IN_MINUTE;
        
        if (minutes > 0) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        id("time").innerText = `${minutes}:${seconds}`;
    }
    
  }

  /** ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();