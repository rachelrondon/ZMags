import React, {Component} from 'react';
import axios from 'axios';
import {Card, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';

class HackerNews extends Component {
  constructor (props) {
    super (props);

    this.state = {
      stories: [],
    };
  }

  componentDidMount = async () => {
  /* A variable for the base url that will be used within the three api calls is defined */
    let baseURL = 'https://hacker-news.firebaseio.com/v0'
  /* Three arrays are declared */
    let stories = [];
    let authors = [];
    let authorDetails = [];
  /* The first API call is created that will return top stories ids from the Hacker News API */
    const results = await axios.get (`${baseURL}/topstories.json`);
  /* The data received from the previous api call is filtered and an array of randomized 10 top stories are returned */
    let ids = Array.from ({length: 10},() => results.data[Math.floor (Math.random () * (100 - 1 + 1) + 1)]);
  /* A loop iterating over the ids array is created */
    for (let id of ids) {
  /* The variable idVariable is defined as the iteration of the ids array */
      let idVariable = id;
  /* The second api call is declared that will return data that contains information about each story */
      const storyInfo = await axios.get (`${baseURL}/item/${idVariable}.json`);
  /* The data returned from the second api call is pushed into the stories array */
      stories.push(storyInfo.data);
  /* The specific data regarding the author's id is pushed into the author's array */
      authors.push(storyInfo.data.by);
    }
  /* A loop iterating over the authors array is created */
    for (let author of authors) {
  /* The variable authorVariable is defined as the iteration of the authors array */
      let authorVariable = author;
  /* The third api call is declared that will return data that contains information about each author */
      const authorData = await axios.get (`${baseURL}/user/${authorVariable}.json`);
  /* The data returned from the third api call is pushed into the authorDetails array */
      authorDetails.push (authorData.data);
    }
  /* A loop iterating over the stories array is created */
    for (let story of stories) {
  /* A loop iterating over the authorDetails array is created */
      for (let authorDetail of authorDetails) {
  /* A conditional statement is declared that checks if the author id matches in both arrays */
        if (story.by === authorDetail.id) {
  /* A new stories array value (karma) is declared - this value is the karma score for each author */
          story.karma = authorDetail.karma;
        }
      }
    }
  /* The stories array is sorted by the score value;
    the stories will be listed in ascending order based on the story score */
    stories.sort((a, b) => {
      return a.score - b.score;
    });
  /* A loop iterating over the stories array is created */
    for (let story of stories) {
  /* Two new stories array values are created (updatedTitle & updatedBy) */
      story.updatedTitle = story.title.toUpperCase();
      story.updatedBy = story.by.toUpperCase();
    }
  /* The numbers array is created */
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  /* A loop iterating over the stories array is created */
    for (let i = 0; i < stories.length; i++) {
  /* A loop iterating over the numbers array is created */
      for (let j = 0; j < numbers.length; j++) {
  /* A new stories array value is created (storyNumber) */
        stories[i].storyNumber = numbers[i];
      }
    }
  /* The state for the stories array is updated */
    this.setState ({stories: stories});
  };

  render () {
    return (
      <div>
        <div className="card-container">

          <Card
            className="nav-bar"
            zDepth={1}
            style={{
              iconElementLeft: 'none',
              backgroundColor: '#333',
            }}
          >
            <FlatButton
              className="logo"
              hoverColor="#333"
              className="title-link"
              label="HACKER NEWS"
              href={'/'}
              style={{
                marginTop: '11px',
                fontFamily: 'Roboto, sans-serif',
                paddingLeft: '10px',
                fontSize: '15px',
                color: '#f2f2f2',
              }}
            />
          </Card>

          <div className="story-card">
            {this.state.stories.map (story => {
              return (
                <div key={story.id}>
                  <Card
                    zDepth={1}
                    className="single-card"
                    style={{
                      backgroundColor: '#f2f2f2',
                    }}
                  >
                    <CardText>
                      <div className="first-row">
                        <h4>{story.storyNumber}.</h4><h4>{story.updatedTitle}</h4>
                      </div>
                      <div className="story-url">
                        <a className="url" href={story.url}>{story.url}</a>
                      </div>
                      <div className="story-info">
                        <h4>SCORE: {story.score} </h4>
                        <h4>AUTHOR'S ID: {story.updatedBy} </h4>
                        <h4>AUTHOR'S KARMA SCORE: {story.karma}</h4>
                        <h4>TIMESTAMP: {story.time}</h4>
                      </div>
                    </CardText>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default HackerNews;
