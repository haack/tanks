import * as React from 'react';
import Nav from './nav';
import Game from './game';
import Editor from './editor';

export default class App extends React.Component {
  render() {
    return (<div>
      <Nav />
      <div className="columns">
        <Editor />
        
        <Game />
      </div>
    </div>);
  }
}