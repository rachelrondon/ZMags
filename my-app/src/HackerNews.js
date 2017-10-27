import React, { Component } from "react";
import axios from "axios";

class HackerNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      ids: [],
      theIdList: []
    };
  }

  componentDidMount = async () => {

    const results = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    // console.log(results.data)

    let idArray = Array.from({length: 10}, () => results.data[Math.floor(Math.random() * (500 - 1 + 1) + 1)]);
    // console.log(idArray);

    let theStoryData = [];
    for (let i = 0; i < idArray.length; i++) {
      const storyInfo = await axios.get('https://hacker-news.firebaseio.com/v0/item/' + idArray[i] + '.json');
      theStoryData.push(storyInfo.data)

      theStoryData.sort((a, b) => {
        return b.score - a.score;
      });
      console.log(theStoryData);

      }
    }


  render(){
    return(
      <div>
        <div className="idContainer">

        </div>
      </div>
    )
  }

  }

export default HackerNews;
