import React, { Component } from 'react'
import Combinations from './Combinations';
import WordForm from './WordForm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onSubmit = value => this.setState({ value })

  render() {
    return (
      <div>
        <WordForm onSubmit={this.onSubmit} />
        {this.state.value ? <Combinations word={this.state.value} /> : null}
      </div>
    );
  }
}
