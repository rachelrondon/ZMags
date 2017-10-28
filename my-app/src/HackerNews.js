import React, { Component } from "react";
import axios from "axios";
// import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import AppBar from 'material-ui/AppBar';
import {grey50} from 'material-ui/styles/colors'


class HackerNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theStoryData: [],
      shadow: 1,
      count: 0,
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


      let count = 0;


        for (let i = 0; i < theStoryData.length; i++) {
          for (let j = 0; j < authorArray.length; j++) {
            if (theStoryData[i].by === authorArray[j].id) {
              theStoryData[i].karma = authorArray[j].karma
            }
          }
        }


      this.setState({ count: count })

      theStoryData.sort((a, b) => {
        return a.score - b.score;
      });


      this.setState({theStoryData: theStoryData})

      }
    }
  }

  render(){
    return(
      <div>
        <div className="cardContainer">

      <Card
      style={{
        backgroundColor:'#333',
        height: '34px',
        width: '85%',
        iconElementLeft: 'none',
      }}
      >
      <CardHeader
      title="Hacker News"
      titleColor={grey50}
      style={{
        paddingLeft: '10px',
      }}
      >


      </CardHeader>

      </Card>

        <div className="storyCard">
       {this.state.theStoryData.map((storydata) => {
          return(
            <div key={storydata.id}>
            <Card
            zDepth={1}
            className="singleCard"
            style={{
              width: '1200px',
              height: '135px',
              paddingLeft: '20px',
              textAlign: 'left',
              color: '#333',

            }}>
              <CardText>
              <CardActions>
                <FlatButton
                label={storydata.title}
                href={storydata.url}
                hoverColor={grey50}
                style={{
                  fontSize: '40px'
                }}

                />
              </CardActions>
              <h4>Score: {storydata.score} | Author's Id: {storydata.by} | Author's Karma Score: {storydata.karma} | Timestamp: {storydata.time}</h4>
              </CardText>
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
