import React, { Component } from 'react';
import './App.css';
import Block from './block';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      root: [{
        id: 0,
        props: {
          color: 'rgba(0,0,0,.1)',
          flex: 1,
          height: 20
        },
        children: [],
        type: 'block',
        name: 'root'
      }],
      nextId: 1,
      selected: 0
    }
  }

  componentDidMount() {
    this.height.value = this.getValue('height');
    this.flex.value = this.getValue('flex');
  }

  addChild(type, props) {
    const id = Number(this.state.selected);
    const context = this;
    const newTree = Object.assign({}, this.state.root);

    (function add (tree, id) {
      if (tree.id === id) {
        tree.children.push({
          id: context.state.nextId,
          props: props,
          children: [],
          type: type
        })
      } else { tree.children.forEach(child => add(child, id)) }
    }(newTree[0], id))

    this.setState({
      root: newTree,
      nextId: this.state.nextId + 1
    })
  }

  updateProps (key, value) {
    const newTree = Object.assign({}, this.state.root);
    const id = this.state.selected;

    (function update (tree) {
      if (tree.id === id) { tree.props[key] = value }
      else { tree.children.forEach(child => update(child)) }
    }(newTree[0]))

    this.setState({ root: newTree })
  }

  getValue (key) {
    const id = this.state.selected
    let value;

    (function search (tree) {
      if (tree.id === id) { 
        return value = tree.props[key]
      }
      else { tree.children.forEach(child => search(child)) }
    }(this.state.root[0]))

    return value;
  } 

  setSelected (e, id) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({ selected: id })

    setTimeout(() => { 
      this.height.value = this.getValue('height');
      this.flex.value = this.getValue('flex');
    }, 20)
  }

  randomColor () {
    let color = '';

    while (color.length < 7) {
      color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }
    return color;
  }

  mapComponents (components) {
    const mapped = []

    _.each(components, c => {
      if (c.children) {
        mapped.push(
          <Block 
            setSelected={this.setSelected.bind(this)}
            key={c.id} 
            id={c.id}
            selected={this.state.selected} 
            {...c.props}
          >
            {this.mapComponents(c.children)}
          </Block>
        )
      }
    })

    return mapped;
  }

  render() {
    return (
      <div className="App">
        <div style={{marginBottom: '20px', marginTop: '20px'}}>
          <div style={{marginBottom: '20px'}}>
            Height
            <input
              id='height'
              label='Height' 
              type='range'
              min={0}
              max={100}
              step={10}
              ref={(i) => this.height = i}
              onChange={() => this.updateProps('height', this.height.value)}
            />
          </div>
          <div style={{marginBottom: '20px'}}>
            Flex
            <input
              id='flex'
              label='Flex' 
              type='range'
              min={0}
              max={10}
              ref={(i) => this.flex = i}
              onChange={() => this.updateProps('flex', this.flex.value)}
            />
          </div>
          <div style={{marginBottom: '20px'}}>
            <button  
              onClick={() => ( 
                this.addChild('BLOCK', {color: this.randomColor(), flex: 1, height: 20})
              )}> ADD BLOCK
            </button>
          </div>
          <br />
        </div>
        {this.mapComponents(this.state.root)}
      </div>
    )
  }
}

export default App;

