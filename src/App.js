import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state=
    {
      cards:[{
        Src: "./images/WWK/jace, the mind sculptor.jpg"
      }],
      currentPack: "AHK"
    }
    this.handlePackSelect = this.handlePackSelect.bind(this);
    this.openPack = this.openPack.bind(this);
  }
  handlePackSelect = (selectedPack) =>
  {
    this.setState(
      {
        currentPack: selectedPack
      }
    )
  }
  openPack = () =>
  {
    var setName = this.state.currentPack;
    var cardbacks = {}
    // for(i = 0; i < 15; ++i)
    // {

    //   document.getElementById(name).src = "images/MTG Card Back.jpg";
    // }
  
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nostalgia MTG</h2>
          <Select
          name="form-field-name"
          value={this.state.currentPack}
          onChange={this.handlePackSelect}
          options={[
            { value: 'AHK', label: 'Amonkhet' },
            { value: 'AER', label: 'Aether Revolt' },
            { value: 'KLD', label: 'Kaladesh' },
            { value: 'EMN', label: 'Eldritch Moon' },
            { value: 'SOI', label: 'Shadows over Innistrad' },
            { value: 'OGW', label: 'Oath of the Gatewatch' },
          ]}
        />
        <br />
	      <button onclick={this.openPack()}> Open Pack </button>
        </div>
        <div className="PackHolder">
            <img src={this.state.cards[0]["Src"]}/>
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
            <img src={this.state.cards[0]["Src"]} />
          </div>

      </div>
    );
  }
}

export default App;
