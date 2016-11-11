import React from 'react';

export default class Block extends React.Component {
  render() {
    const {color, height, id, setSelected, selected, flex} = this.props;

    const boxStyle = {
      flex: flex, 
      backgroundColor: color, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent:'center', 
      height: `${height}%`,
      padding: '20px',
      margin: '20px',
      position: 'relative',
      flexWrap: 'wrap',
      cursor: 'pointer',
      boxSizing: 'border-box',
      overflow: 'auto',
      boxShadow: selected === id ? 'inset 0 0 0 6px red' : null
    }

    return (
      <div 
        style={boxStyle}
        onClick={(e) => setSelected(e, id)}
      >
        {this.props.children}
      </div>
    );
  }
}


