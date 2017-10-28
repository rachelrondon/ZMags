import React, { Component } from "react";
import axios from "axios";
// import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';



class HackerNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theStoryData: [],
      shadow: 1,
    };
  }

  componentDidMount = async () => {

    const results = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');

    let idArray = Array.from({length: 10}, () => results.data[Math.floor(Math.random() * (500 - 1 + 1) + 1)]);

    let theStoryData = [];
    for (let i = 0; i < idArray.length; i++) {
      const storyInfo = await axios.get('https://hacker-news.firebaseio.com/v0/item/' + idArray[i] + '.json');
      theStoryData.push(storyInfo.data)

      theStoryData.sort((a, b) => {
        return b.score - a.score;
      });

      let authorName = [];

      authorName.push(storyInfo.data.by);

      let authorArray = [];

      for (let i = 0; i < authorName.length; i++) {
        const authorData = await axios.get('https://hacker-news.firebaseio.com/v0/user/' + authorName[i] + '.json');
        authorArray.push(authorData.data)

        // console.log(authorData.data.id)
        // console.log(authorArray[i].karma);

        for (let i = 0; i < authorArray.length; i++) {
          // console.log(authorArray[i].karma);
        }
        let karmaScore = [];

        // console.log(authorData)

        for (let i = 0; i < theStoryData.length; i++) {
          for (let j = 0; j < authorArray.length; j++) {
            if (theStoryData[i].by === authorArray[j].id) {
              theStoryData[i].karma = authorArray[j].karma
            }
          }
        }
      }

      console.log(theStoryData);

      theStoryData.sort((a, b) => {
        return a.score - b.score;
      });

      this.setState({theStoryData: theStoryData})
      }
    }


  render(){
    return(
      <div>
        <div className="cardContainer">
        <div className="storyCard">
       {this.state.theStoryData.map((storydata) => {
          return(
            <div key={storydata.id}>
            <Card
            className="singleCard"
            style={{
              width: '1200px',
              height: '400px',
              paddingTop: '40px',
              paddingLeft: '20px',
              textAlign: 'center',
              color: '#333'
            }}>
              <CardText>
              <h1>{storydata.title}</h1>
              <hr />
              <h2>Score: {storydata.score}</h2>
              <h3>Author's Id: {storydata.by}</h3>
              <h3>Author's Karma Score: {storydata.karma}</h3>
              <h3>Timestamp: {storydata.time}</h3>
              </CardText>
              <hr />
              <CardActions>
              <FlatButton label="link" href={storydata.url}/>
              </CardActions>
            </Card>
            </div>
          )
        })}
        </div>
        </div>
      </div>
    )
  }
  }

export default HackerNews;
