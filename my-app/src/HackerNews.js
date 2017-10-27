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
      // console.log(theStoryData[i].score);

      let sortArray = [];
      sortArray.push(theStoryData[i].score);
      // console.log(sortArray);

      // const sortedArray(a, b) => {
      //   return b - a;
      // }
      // console.log(sortedArray)

      // console.log(storyInfo.data.score)
      // console.log(theStoryData[i].score)
    }




      // .then((results) => {
      //   console.log(results.data);
      //   results.json().then((ids_data) => {
      //     this.setState({ids: ids_data});
      //
      //   /* I need to put these id's into an array */
      //   /* Then I need to put the data that is received from each story into an array that then can be sorted by the score */
      //   /* I then need to map over each id and display the information for each id */
      //   /* Also, need to be able to use this information to grab the author id */
      //
      //   let idArray = Array.from({length: 10}, () => ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)]);
      //   console.log(idArray)
      //
      //
      //   for (let i = 0; i < idArray.length; i++){
      //     return fetch('https://hacker-news.firebaseio.com/v0/item/' + idArray[i] + '.json')
      //   }
      //   })
      //   .then((results) => {
      //     results.json().then((stories_data) => {
      //       this.setState({stories: stories_data})
      //       console.log(stories_data)
      //     })
      //   })
      //   .catch(function(error) {
      //     console.log('Request failed', error)
      //   })
      // })
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
