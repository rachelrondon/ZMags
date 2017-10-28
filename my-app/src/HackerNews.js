import React, {Component} from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import {grey50} from 'material-ui/styles/colors';

class HackerNews extends Component {
  constructor (props) {
    super (props);

    this.state = {
      theStoryData: [],
    };
  }

  componentDidMount = async () => {

    let theStoryData = [];
    let authorName = [];
    let authorArray = [];

    const results = await axios.get ('https://hacker-news.firebaseio.com/v0/topstories.json');

    let idArray = Array.from ({length: 10}, () => results.data[Math.floor (Math.random () * (100 - 1 + 1) + 1)]);

    console.log(idArray);

    for (let i = 0; i < idArray.length; i++) {
      const storyInfo = await axios.get ('https://hacker-news.firebaseio.com/v0/item/' + idArray[i] + '.json');

      theStoryData.push(storyInfo.data);


      authorName.push(storyInfo.data.by);

      for (let i = 0; i < authorName.length; i++) {
        const authorData = await axios.get (
          'https://hacker-news.firebaseio.com/v0/user/' +
            authorName[i] +
            '.json'
        );
        authorArray.push (authorData.data);


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

        let numbers = [1,2,3,4,5,6,7,8,9,10];

        for (let i = 0; i < theStoryData.length; i++) {
          for (let j = 0; j < numbers.length; j++) {
            theStoryData[i].number = numbers[i];
          }
        }

        console.log(theStoryData);


        this.setState ({theStoryData: theStoryData});

      }
    }
  };

  render () {
    return (
      <div>
        <div className="cardContainer">

          <Card
            zDepth={1}
            style={{
              backgroundColor: '#333',
              height: '50px',
              width: '950px',
              iconElementLeft: 'none',
            }}
          >
            <div  className="nav-bar">
              <FlatButton className="logo" titleColor={grey50} style={{ paddingLeft: '10px', fontSize: '15px', color: '#fff', fontFamily: 'Roboto, sans-serif'}} hoverColor='#333' className="title-link" label='HACKER NEWS' href={'/'} style={{ marginTop: '11px', fontFamily: 'Roboto, sans-serif', color: '#f2f2f2', fontSize: '15px'}}/>
            </div>
          </Card>

          <div className="storyCard">
            {this.state.theStoryData.map (storydata => {
              return (
                <div key={storydata.id}>
                  <Card
                    zDepth={1}
                    className="singleCard"
                    style={{
                      width: '950px',
                      height: '150px',
                      paddingLeft: '20px',
                      textAlign: 'left',
                      color: '#333',
                      alignContent: 'center',
                      backgroundColor: '#f2f2f2'
                    }}
                  >
                <CardText>
                <div className="first-row">
                <h4>{storydata.number}.</h4><FlatButton className="title-link" label={storydata.title} hoverColor={grey50} href={storydata.url} style={{ marginTop: '9px', fontFamily: 'Roboto, sans-serif'}}/>
                </div>

                <h4>Score: {storydata.score} | Author's Id: {storydata.by} | Author's Karma Score: {storydata.karma}  | Timestamp: {storydata.time}</h4>
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
