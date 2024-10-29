/**
 * A webpage for fetching cute pet photos. Puppies or kitties
 * will be populated on the page after the user selects their desired
 * pet type.
 * 
 * Important information to complete this assignment:
 * - Service URL: https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php
 * - Query Parameters (required): ?animal=<value>
 *   - Details: animal is the name of the query parameter you need to assign
 *              a value to. This API recognizes either a value of puppy or kitty.
 * 
 * Example Request (with puppy as the value):
 * https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=puppy
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * TODO: What do we need to initialize?
   */
  function init() {
    const RADIOS = qsa("div input");
    const KITTY = RADIOS[0];
    const PUPPY = RADIOS[1];
    KITTY.addEventListener("change", change);
    PUPPY.addEventListener("change", change);
  }

  /**
   * TODO: Fetch data from the ajax pets api!
   */
  function makeRequest(animal) {
    // TODO
    if (animal == "puppy" || animal == "kitty") {
        let imgArray = fetch("https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=" + animal)
        .then(statusCheck)
        .then(res => res.text())
        .then(text => text.split("\n"))
        .catch(error => {return error.text});
        return imgArray;
    }
  }

  /**
   * TODO: Implement any other functions you need
   */
  async function change() {
    clear();
    let pictures = await makeRequest(this.value);
    const DIV = id("pictures");
    for (let index = 0; index < pictures.length; index++) {
        if (pictures[index].trim() != "") {
            let img = document.createElement("img");
            img.src = pictures[index];
            img.alt = this.value + index;
            DIV.appendChild(img);
        }
    }
  }

  function clear() {
    const DIV = id("pictures");
    while (DIV.lastChild) {
        DIV.removeChild(DIV.lastChild);
    }
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
