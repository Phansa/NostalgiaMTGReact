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
        src: "/images/WWK/jace, the mind sculptor.jpg",
        foilValue: false,
      },
      {
        src: "/images/ALL/force of will.jpg",
        foilValue: false,
      },
      {
        src: "/images/NPH/batterskull.jpg",
        foilValue: false,
      },
      {
        src: "/images/WWK/stoneforge mystic.jpg",
        foilValue: true,
      }],
      currentPack: { value: 'DOM', label: "Dominaria"},
      preloadedSets: new Map(),
      options: [
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
        { value: 'BFZ', label: 'Battle for Zendikar'},
        { value: 'DTK', label: 'Dragon of Tarkir'},
        { value: 'FRF', label: 'Fate Reforged'},
        { value: 'KTK', label: 'Khans of Tarkir'},
        { value: 'JOU', label: 'Journey into Nyx'},
        { value: 'BNG', label: 'Born of the Gods'},
        { value: 'THS', label: 'Theros'},
        { value: 'DGM', label: 'Dragon\'s Maze'},
        { value: 'GTC', label: 'Gatecrash'},
        { value: 'RTR', label: 'Return to Ravnica'},
        { value: 'AVR', label: 'Avacyn Restored'},
        { value: 'DKA', label: 'Dark Ascension'},
        { value: 'ISD', label: 'Innistrad'},
        { value: 'NPH', label: 'New Phyrexia'},
        { value: 'MBS', label: 'Mirrodin Besieged'},
        { value: 'SOM', label: 'Scars of Mirrodin'},
        { value: 'ROE', label: 'Rise of the Eldrazi'},
        { value: 'WWK', label: 'Worldwake'},
        { value: 'ZEN', label: 'Zendikar'},
        { value: 'ARB', label: 'Alara Reborn'},
        { value: 'CON', label: 'Conflux'},
        { value: 'ALA', label: 'Shards of Alara'}
      ]
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
    var introTextExists = document.getElementById("IntroText");
    if(introTextExists)
    {
      introTextExists.remove();
    }
    var currentSet = this.state.currentPack.value;
    for(var set in allSets)
    {
      if(allSets[set].code === currentSet)
      {
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
    let mythicUpgrade = Math.floor(Math.random() * 7);
    let currentSetImageName = currentSet.name;
    if(currentSet.name === "CON")
    {
      currentSetImageName = "CON_"
    }
    let foilChance = Math.floor(Math.random() * 89);
    let foilSlot = 0;
    if(foilChance === 88)
    {
      foilSlot = Math.floor(Math.random() * 15);
    }
    while(packContents.length < 1)
    {
      if(mythicUpgrade === 6)
      {	
        let index = Math.floor(Math.random() * currentSet.mythics.length);
        packContents.push(currentSet.mythics[index].imageName)
        let mythicRare = {}
        mythicRare.src = "/images/" + currentSetImageName + "/" + currentSet.mythics[index].imageName + ".jpg";
        if(finalArray.length + 1 === foilSlot)
        {
          mythicRare.foilValue = true;
        }
        else
        {
          mythicRare.foilValue = false;
        }
        finalArray.push(mythicRare);
      }
      else
      {
        let index = Math.floor(Math.random() * currentSet.rares.length);
        packContents.push(currentSet.rares[index].imageName)
        let rare = {}
        rare.src = "/images/" + currentSetImageName + "/" + currentSet.rares[index].imageName + ".jpg";
        if(finalArray.length + 1 === foilSlot)
        {
          rare.foilValue = true;
        }
        else
        {
          rare.foilValue = false;
        }        
        finalArray.push(rare);
      }
    }

    while(packContents.length < 4)
    {
      let index = Math.floor(Math.random() * currentSet.uncommons.length);
      if(!(packContents.includes(currentSet.uncommons[index].imageName)))
      {
        packContents.push(currentSet.uncommons[index].imageName);
        let uncommon = {};
        uncommon.src = "/images/" + currentSetImageName + "/" + currentSet.uncommons[index].imageName + ".jpg";
        if(finalArray.length + 1 === foilSlot)
        {
          uncommon.foilValue = true;
        }
        else
        {
          uncommon.foilValue = false;
        }        
        finalArray.push(uncommon);
      }
    }

    while(packContents.length < 15)
    {
      let index = Math.floor(Math.random() * currentSet.commons.length);
      if(!(packContents.includes(currentSet.commons[index].imageName)))
      {
        packContents.push(currentSet.commons[index].imageName)
        let common = {};
        common.src = "/images/" + currentSetImageName + "/" + currentSet.commons[index].imageName + ".jpg";
        if(finalArray.length + 1 === foilSlot)
        {
          common.foilValue = true;
        }
        else
        {
          common.foilValue = false;
        }  
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
    return <Card source={card['src']} foil={card['foilValue']}/>
  }
  
  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Nostalgia MTG</h2>
          <Select
          name="form-field-name"
          onChange={this.handlePackSelect}
          value={this.state.currentPack}
          options={this.state.options}
        />
        <br />
	      <button onClick={() => this.openPack()}> Open Pack </button>
        </div>
        <div className="PackHolder">
          {this.createCards(this.state.cards)}
        </div>
        <div className="IntroText" id="IntroText">
          <p>
            Select a pack from the dropdown and then click open pack. 
            <br />
            There is a chance that a card is foil and if so it's hue will 
            be rotated. Stoneforge Mystic above is an example of the foil effect. 
            <br /> Feel free
            to report issues or make suggestions on the <a href="https://github.com/Phansa/NostalgiaMTGReact">
            GitHub repository</a>.
            <br />
            </p>
          </div>
          <div className="Disclaimer">
            <p>
              NostalgiaMTG is unofficial Fan Content permitted under the Fan Content Policy. 
              <br />
              Not approved/endorsed by Wizards. 
              <br /> 
              Portions of the materials used are property of Wizards of the Coast. 
              <br />
              ©Wizards of the Coast LLC.
            </p>
          </div>
      </div>
    );
  }
}

export default App;
