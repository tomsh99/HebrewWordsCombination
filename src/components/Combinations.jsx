import React, { Component } from 'react'
import { List, ListItem, Button } from "@material-ui/core";
import { permutationCombination } from "js-combinatorics";
import HebrewUtils from '../Utils/HebrewUtils';
import FirebaseUtils from '../Utils/FirebaseUtils';

export default class Combinations extends Component {
  constructor(props) {
    super(props);
    this.word = props.word;
    this.state = {
      varifiedWords: [],
      unvalidWords: [],
      combinations: [],
      wiki: [],
      loading: false
    }
    this.updateCombinations(this.word);
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const varifiedWords = await FirebaseUtils.getVarifiedWords()
    const unvalidWords = await FirebaseUtils.getUnvalidWords()
    const wiki = await FirebaseUtils.getWikiWords()
    this.setState({ varifiedWords, unvalidWords, wiki })
    this.updateCombinations(this.word);
    this.setState({ loading: false })
  }

  componentWillReceiveProps(nextProps) {
    this.updateCombinations(nextProps.word)
  }

  updateCombinations = word => {
    const combinations = permutationCombination(word.split(''))
      .toArray()
      .filter(value => value.length > 1)
      .map(value => value.join(''))
      .map(value => HebrewUtils.fixWord(value))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));

    this.setState({ combinations });
  }

  varify = async word => {
    await FirebaseUtils.addVarifiedWord(word);
    this.setState({ varifiedWords: [...this.state.varifiedWords, word] })
  }

  unvalidate = async word => {
    await FirebaseUtils.addUnvalidWord(word);
    this.setState({ unvalidWords: [...this.state.unvalidWords, word] })
  }

  orderCombination = word => {
    const isVarified = this.state.varifiedWords.includes(word);
    const isUnvalid = this.state.unvalidWords.includes(word);
    const isInWiki = Object.keys(this.state.wiki).includes(word);
    console.log(this.state.wiki)
    if (isVarified) {
      return (
        <div>
          {word} - varified
        </div>
      )
    }
    else if (isUnvalid) {
      return (
        <div>
          {word} - unvalid
        </div>
      )
    }
    return (
      <div>
        {isInWiki ? <div>{word} - {this.state.wiki[word]}
        </div> : word}
        <Button onClick={async () => await this.varify(word)}>Varify</Button>
        <Button onClick={async () => await this.unvalidate(word)}>Unvalidate</Button>
      </div>
    )
  }

  render() {
    return this.state.loading ?
      (
        <div>Calculating...</div>
      )
      :
      (
        <List>
          {this.state.combinations.map(cmb => (
            <ListItem key={cmb}>
              {this.orderCombination(cmb)}
            </ListItem>))
          }
        </List>
      )
  }
}

