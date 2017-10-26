// import React, { Component } from "react";
// import HackerNews from './HackerNews';
//
// class StoryData extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       stories: [],
//       ids: [],
//       theIdList: [],
//   };
// }
//
//
//   componentDidMount() {
//     fetch(`https://hacker-news.firebaseio.com/v0/item/${theIdList}.json`, {
//       method: "GET"
//     })
//     .then((results) => {
//       results.json().then((stories_data) => {
//         this.setState({stories: stories_data});
//         console.log(stories_data)
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//   }
// }
//
//
// export default StoryData;
