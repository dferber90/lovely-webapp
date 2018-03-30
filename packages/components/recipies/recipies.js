import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RecipiesHome } from '../recipies-home';

export class Recipies extends React.Component {
  static displayName = 'Recipies';
  render() {
    return (
      <Switch>
        <Route exact path="/recipies" component={RecipiesHome} />
      </Switch>
    );
  }
}
