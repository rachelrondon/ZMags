# Hacker News: Ten of The Top Stories

This application provides a list of ten of the top Hacker News stories. The ten stories are randomly pulled from the Hacker News Top Stories API. The stories are listed in ascending order based on the stories score. The Hacker News logo acts as a refresh button and a new list of 10 randomized stories will display when the Hacker News logo is pressed.

## Getting Started

Deployment Instructions:
- run git clone https://github.com/rachelrondon/ZMags.git within the command line
- run npm install within hacker-news-app
- run npm start

### Testing

I utilized the Sinon.JS (http://sinonjs.org/) unit testing framework to write tests for this application. I decided on this framework because I was able to find a lot of resources that confirmed Sinon.JS is a great tool to test asynchronous functions. In addition to the documentation, I also reviewed the tutorial posted by Josh Newman on YouTube (https://www.youtube.com/watch?v=09Lig2mlZS0).

The tests for this application are in progress. I am unbale to run the tests based on an issue that I have been troubleshooting with the Babel compiler.

## Technologies

    "axios": "^0.17.0",
    "jest": "^21.2.1",
    "material-ui": "^0.15.4",
    "react": "^15.3.2",
    "sinon-test": "^2.1.1"

## Author

* **Rachel Rondon**
(https://github.com/rachelrondon)
