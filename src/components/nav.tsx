import * as React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
    <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <h1 className="title">Tanks</h1>
          </a>
        </div>
      </div>
    </nav>);
  }
}