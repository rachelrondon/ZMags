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
      theStoryData: [],
      stories: [],
    };
  }

  componentDidMount = async () => {
    let theStoryData = [];
    let authorName = [];
    let authorArray = [];

    const results = await axios.get (
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    let idArray = Array.from (
      {length: 10},
      () => results.data[Math.floor (Math.random () * (100 - 1 + 1) + 1)]
    );

    for (let i = 0; i < idArray.length; i++) {
      const storyInfo = await axios.get (
        'https://hacker-news.firebaseio.com/v0/item/' + idArray[i] + '.json'
      );
      theStoryData.push (storyInfo.data);
      authorName.push (storyInfo.data.by);
    }

    for (let i = 0; i < authorName.length; i++) {
      const authorData = await axios.get (
        'https://hacker-news.firebaseio.com/v0/user/' + authorName[i] + '.json'
      );
      authorArray.push (authorData.data);
    }

    for (let i = 0; i < theStoryData.length; i++) {
      for (let j = 0; j < authorArray.length; j++) {
        if (theStoryData[i].by === authorArray[j].id) {
          theStoryData[i].karma = authorArray[j].karma;
        }
      }
    }

    theStoryData.sort ((a, b) => {
      return a.score - b.score;
    });


    for (let i = 0; i < theStoryData.length; i++) {
      theStoryData[i].updatedTitle = theStoryData[i].title.toUpperCase();
      theStoryData[i].updatedBy = theStoryData[i].by.toUpperCase();
    }


    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let i = 0; i < theStoryData.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        theStoryData[i].number = numbers[i];
      }
    }

    this.setState ({theStoryData: theStoryData});
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
            {this.state.theStoryData.map (storydata => {
              return (
                <div key={storydata.id}>
                  <Card
                    zDepth={1}
                    className="single-card"
                    style={{
                      backgroundColor: '#f2f2f2',
                    }}
                  >
                    <CardText>
                      <div className="first-row">
                        <h4>{storydata.number}.</h4><h4>{storydata.updatedTitle}</h4>
                      </div>
                      <div className="story-url">
                        <a className="url" href={storydata.url}>{storydata.url}</a>
                      </div>
                      <div className="story-info">

                        <h4>SCORE: {storydata.score} </h4>
                        <h4>AUTHOR'S ID: {storydata.updatedBy} </h4>
                        <h4>AUTHOR'S KARMA SCORE: {storydata.karma}</h4>
                        <h4>TIMESTAMP: {storydata.time}</h4>
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
