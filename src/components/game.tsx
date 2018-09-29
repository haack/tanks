import * as React from 'react';
import '../core/game/main';

export default class Game extends React.Component {
  render() {
    return (
      <div className="column is-8 box hero fill-height is-paddingless">
        <div id="game-container">
        </div>
      </div>
    );
  }
}