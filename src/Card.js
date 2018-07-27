import React from 'react';

let Card = function statelessFunctionComponentClass(props) {
  let source = props.source
  let foil = props.foil

  let style = {
    margin: '10px 5px 0px 5px'
  };

  let foilStyle = 
  {
    margin: '10px 5px 0px 5px',
    filter: 'hue-rotate(90deg)'
  }

  return (
    <img src={"."+source} style={foil ? foilStyle : style} alt=''/>
  );
};

export default Card;
