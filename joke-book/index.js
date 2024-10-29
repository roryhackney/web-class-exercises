/**
 * Exercise 7 code
 * 
 * Define the following endpoints:
 * 1. Endpoint 1  (GET): /jokebook/categories
 *   - should respond with a plain text response
 *   - should prepend the phrase "a possible category is " to each possible category and each
 *     sentence should be on its own line.
 * 2. Endpoint 2 (GET): /jokebook/joke/:category
 *   - should respond with a JSON response
 *   - will send a random JSON response from the specified /:category
 *   - If the category is not valid, will respond with {'error': 'no category listed for category'}
 */
'use strict';

const express = require('express');
const app = express();

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'What is worse than raining cats and dogs?',
    'response': 'Hailing taxis'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  }
];

app.get("/jokebook/categories", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    let response = "";
    categories.forEach(category => {
       response += `a possible category is ${category}\n`;
    });
    res.send(response);
    res.end();
});

app.get("/jokebook/joke/:category", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let category = req.params.category;
    if (category == "lameJoke") {
      let chooseLame = Math.floor(Math.random() * lameJoke.length);
      res.json(lameJoke[chooseLame]);
    } else if (category == "funnyJoke") {
      let chooseFunny = Math.floor(Math.random() * funnyJoke.length);
      res.json(funnyJoke[chooseFunny]);
    } else {
      res.json({'error': 'no category listed for category'});
    }
    res.end();
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);