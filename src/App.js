import React, { Component } from 'react';
import './App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import allSets from './data/AllSets.json';
import Card from './Card.js';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state=
    {
      cards:[{
        src: "./images/WWK/jace, the mind sculptor.jpg"
      },
      {
        src: "./images/WWK/stoneforge mystic.jpg"
      }],
      currentPack: "AHK",
      preloadedSets: new Map(),
    }
    this.handlePackSelect = this.handlePackSelect.bind(this);
    this.openPack = this.openPack.bind(this);
    this.processPack = this.processPack.bind(this);
    this.createCard = this.createCard.bind(this);
    this.createCards = this.createCards.bind(this);
    this.processStandardPack = this.processStandardPack.bind(this);
  }

  handlePackSelect = (selectedPack) =>
  {
    this.setState(
      {
        currentPack: selectedPack
      }
    )
  }

  processPack = () =>
  {
    var currentSet = this.state.currentPack.value;
    for(var set in allSets)
    {
      if(allSets[set].code === currentSet)
      {
        if(currentSet === "CON")
        {
          currentSet = "CON_"
        }
        if(!(this.state.preloadedSets.has(currentSet)))
        {

          var newSet = {};
          var commons = [];
          var uncommons = [];
          var rares = [];
          var mythicRares = [];
          for(var cardIndex in allSets[currentSet].cards)
          {
            let card = allSets[currentSet].cards[cardIndex];
            if(card.rarity === "Common")
            {
              commons.push(card);
            }
            else if(card.rarity === "Uncommon")
            {
              uncommons.push(card)
            }
            else if(card.rarity === "Rare")
            {
              rares.push(card);
            }
            else if(card.rarity === "Mythic Rare")
            {
              mythicRares.push(card);
            }
          }
          newSet.name = currentSet;
          newSet.commons = commons;
          newSet.uncommons = uncommons;
          newSet.rares = rares;
          newSet.mythics = mythicRares;
          this.setState(
            {
              preloadedSets: new Map(this.state.preloadedSets.set(currentSet, newSet))
            }
          )
        }
      }
    }
  }
  processStandardPack = () =>
  {
    let currentSet = this.state.preloadedSets.get(this.state.currentPack.value);
    let packContents = [];
    let finalArray = [];
    let mythicUpgrade = Math.floor(Math.random() * 8);

    while(packContents.length < 1)
    {
      if(mythicUpgrade === 7)
      {	
        let index = Math.floor(Math.random() * currentSet.mythics.length);
        packContents.push(currentSet.mythics[index])
        let mythicRare = {}
        mythicRare.src = "./images/" + currentSet.name + "/" + currentSet.mythics[index].imageName + ".jpg";
        finalArray.push(mythicRare);
      }
      else
      {
        let index = Math.floor(Math.random() * currentSet.rares.length);
        packContents.push(currentSet.rares[index])
        let rare = {}
        rare.src = "./images/" + currentSet.name + "/" + currentSet.rares[index].imageName + ".jpg";
        finalArray.push(rare);
      }
    }

    while(packContents.length < 4)
    {
      let index = Math.floor(Math.random() * currentSet.uncommons.length);
      if(!(currentSet.uncommons[index] in packContents))  
      {
        packContents.push(currentSet.uncommons[index]);
        let uncommon = {};
        uncommon.src = "./images/" + currentSet.name + "/" + currentSet.uncommons[index].imageName + ".jpg";
        finalArray.push(uncommon);
      }
    }

    while(packContents.length < 15)
    {
      let index = Math.floor(Math.random() * currentSet.commons.length);
      if(!(currentSet.commons[index] in packContents))
      {
        packContents.push(currentSet.commons[index])
        let common = {};
        common.src = "./images/" + currentSet.name + "/" + currentSet.commons[index].imageName + ".jpg";
        finalArray.push(common);
      }
    }

    this.setState(
      {
        cards: finalArray
      }
    )
  }

  openPack = () =>
  {
    this.processPack();
    this.processStandardPack();
  }

  createCards = (cards) =>
  {
    return cards.map(this.createCard);
  }

  createCard = (card) =>
  {
    return <Card source={card['src']}/>
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
            { value: 'DOM', label: "Dominaria"},
            { value: 'RIX', label: "Rivals of Ixalan"},
            { value: 'XLN', label: "Ixalan"},
            { value: 'HOU', label: "Hour of Devastation"},
            { value: 'AKH', label: 'Amonkhet' },
            { value: 'AER', label: 'Aether Revolt' },
            { value: 'KLD', label: 'Kaladesh' },
            { value: 'EMN', label: 'Eldritch Moon' },
            { value: 'SOI', label: 'Shadows over Innistrad' },
            { value: 'OGW', label: 'Oath of the Gatewatch' },
          ]}
        />
        <br />
	      <button onClick={() => this.openPack()}> Open Pack </button>
        </div>
        <div className="PackHolder">
          {this.createCards(this.state.cards)}
        </div>
      </div>
    );
  }
}

export default App;
