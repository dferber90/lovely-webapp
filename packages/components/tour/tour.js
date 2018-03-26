import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TourHome } from '../tour-home';
import { TourAuth } from '../tour-auth';

export class Tour extends React.Component {
  static displayName = 'Tour';
  render() {
    return (
      <Switch>
        <Route exact path="/tour" component={TourHome} />
        <Route path="/tour/auth" component={TourAuth} />
      </Switch>
    );
  }
}
