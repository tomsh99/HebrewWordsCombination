import React, { Component } from 'react'
import { Input, Button } from '@material-ui/core'

export default class WordForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = { value: '' }
  }

  handleChange = e => this.setState({ value: e.target.value });

  render() {
    return (
      <div>
        <Input type="text" placeholder='word' value={this.state.value} onChange={this.handleChange} />
        <Button onClick={() => this.onSubmit(this.state.value)}>Submit</Button>
      </div>
    )
  }
}
