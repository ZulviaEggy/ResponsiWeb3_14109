import React, { Component } from "react";

class cuaca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Yogyakarta,id&mode=json&appid=4c003e583c50abac0846870777a50592&units=metric")
    .then(res => res.json())
    .then(parsedJSON => parsedJSON.results.list(data => (
      {
        id: `${data.id.name}`,
        firstName: `${data.name.first}`,
        lastName: `${data.name.last}`,
        location: `${data.location.state}, ${data.nat}`,
        thumbnail: `${data.picture.large}`,
      }
    )))
    .then(items => this.setState({
      items,
      isLoaded: false
    }))
    .catch(error => console.log('parsing failed', error))
  }

  render() {
    const {items} = this.state;
    return (
      <div className="boxWhite">
        {
          items.length > 0 ? items.map(item => {
            const {id, firstName, lastName, location, thumbnail} = item;
            return (
              <div key={id} className="bgCircle">
                <center><img src={thumbnail} alt={firstName} className="circle"/> </center><br />
                <div className="ctr">
                  {firstName} {lastName}<br />
                  {location}
                </div>

              </div>
            );
          }) : null
        }
      </div>
    );
  }
}

export default cuaca;