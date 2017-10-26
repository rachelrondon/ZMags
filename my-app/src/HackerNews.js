import React, { Component } from "react";

class HackerNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      ids: []
    };
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
      method: 'GET'
    })
    .then((results) => {
        results.json().then((ids_data) => {
          this.setState({ids: ids_data});

          // let idList = ids_data[Math.floor(Math.random() * (10 - 1 + 1) + 1)];

          let idOne = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idTwo = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idThree = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idFour = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idFive = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idSix = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idSeven = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idEight = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idNine = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];
          let idTen = ids_data[Math.floor(Math.random() * (500 - 1 + 1) + 1)];

          let theIdList = [idOne, idTwo, idThree, idFour, idFive, idSix, idSeven, idEight, idNine, idTen]
          console.log(theIdList)

        });
      })
      .catch((err) => {
        console.log(err);
      });
    }


  render(){
    return(
      <div>
        <div className="idContainer">

          {/* {this.state.ids.map((theId) => {
            console.log(theId.id);
            return(
              <div key={theId.id} className="idCard">
                <h1>{theId.id}</h1>
              </div>
            )
          })} */}

        </div>
      </div>
    )
  }

  /* This is the closing tag for this component */
  }


export default HackerNews;
