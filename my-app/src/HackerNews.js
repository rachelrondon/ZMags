import React, { Component } from "react";
import axios from "axios";

class HackerNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      ids: [],
      theIdList: [],
      theStoryData: [],
      authorName: [],
      authorArray: [],
      karmaScore:[],
    };
  }

  componentDidMount = async () => {

    const results = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');

    let idArray = Array.from({length: 10}, () => results.data[Math.floor(Math.random() * (500 - 1 + 1) + 1)]);

    let theStoryData = [];
    for (let i = 0; i < idArray.length; i++) {
      const storyInfo = await axios.get('https://hacker-news.firebaseio.com/v0/item/' + idArray[i] + '.json');
      theStoryData.push(storyInfo.data)

      // console.log(storyInfo.data.by);

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
        return b.score - a.score;
      });

      // this.setState({authorArray: authorArray})
      this.setState({theStoryData: theStoryData})
      }

    }


  render(){
    return(
      <div>
        <div className="idContainer">
       {this.state.theStoryData.map((storydata) => {
          return(
            <div key={storydata.id}>
              <h1>Title: {storydata.title}</h1>
              <h1>URL: {storydata.url}</h1>
              <h1>Timestamp: {storydata.time}</h1>
              <h1>Score: {storydata.score}</h1>
              <h1>Author Id: {storydata.by}</h1>
              <h1>Karma Score: {storydata.karma}</h1>
            </div>
          )
        })}
        </div>
      </div>
    )
  }
  }

export default HackerNews;
