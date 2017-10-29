import React, {Component} from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import {grey50} from 'material-ui/styles/colors';

class HackerNews extends Component {
  constructor (props) {
    super (props);

    this.state = {
      stories: [],
    };
  }

  componentDidMount = async () => {

    let baseURL = 'https://hacker-news.firebaseio.com/v0'
    let stories = [];
    let authors = [];
    let authorDetails = [];

    const results = await axios.get (`${baseURL}/topstories.json`);
    let ids = Array.from ({length: 10},() => results.data[Math.floor (Math.random () * (100 - 1 + 1) + 1)]);

    for (let id of ids) {
      let idVariable = id;
      const storyInfo = await axios.get (`${baseURL}/item/${idVariable}.json`);
      stories.push(storyInfo.data);
      authors.push(storyInfo.data.by);
    }

    for (let author of authors) {
      let authorVariable = author;
      const authorData = await axios.get (`${baseURL}/user/${authorVariable}.json`);
      authorDetails.push (authorData.data);
    }

    for (let story of stories) {
      for (let authorDetail of authorDetails) {
        if (story.by === authorDetail.id) {
          story.karma = authorDetail.karma;
        }
      }
    }

    stories.sort((a, b) => {
      return a.score - b.score;
    });

    for (let story of stories) {
      story.updatedTitle = story.title.toUpperCase();
      story.updatedBy = story.by.toUpperCase();
    }

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let i = 0; i < stories.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        stories[i].storyNumber = numbers[i];
      }
    }

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
