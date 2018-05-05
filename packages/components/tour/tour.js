import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TourHome } from '../tour-home';
import { TourImages } from '../tour-images';
import { TourAccountSystem } from '../tour-account-system';
import { TourTakeover } from '../tour-takeover';
import { TourServerSideRendering } from '../tour-server-side-rendering';

export class Tour extends React.Component {
  static displayName = 'Tour';
  render() {
    return (
      <Switch>
        <Route exact path="/tour" component={TourHome} />
        <Route path="/tour/account-system" component={TourAccountSystem} />
        <Route path="/tour/images" component={TourImages} />
        <Route path="/tour/client-side-takeover" component={TourTakeover} />
        <Route
          path="/tour/server-side-rendering"
          component={TourServerSideRendering}
        />
      </Switch>
    );
  }
}
