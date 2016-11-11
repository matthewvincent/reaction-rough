import React from 'react';

const Container = (props) => (
  <div style={{
    display: 'flex', 
    width: '100%', 
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.1)'
  }}>
    {props.children}
  </div>
);

export default Container;