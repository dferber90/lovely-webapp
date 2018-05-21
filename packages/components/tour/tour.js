import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TourHome } from '../tour-home';
import { TourImages } from '../tour-images';
import { TourAccountSystem } from '../tour-account-system';
import { TourTakeover } from '../tour-takeover';
import { TourServerSideRendering } from '../tour-server-side-rendering';
import { TourRouting } from '../tour-routing';
import { TourDataFetching } from '../tour-data-fetching';
import { NotFound } from '../route-helpers';

export class Tour extends React.Component {
  static displayName = 'Tour';
  render() {
    return (
      <Switch>
        <Route exact path="/tour" component={TourHome} />
        <Route
          exact
          path="/tour/account-system"
          component={TourAccountSystem}
        />
        <Route exact path="/tour/images" component={TourImages} />
        <Route
          exact
          path="/tour/client-side-takeover"
          component={TourTakeover}
        />
        <Route
          exact
          path="/tour/server-side-rendering"
          component={TourServerSideRendering}
        />
        <Route exact path="/tour/routing" component={TourRouting} />
        <Route exact path="/tour/data-fetching" component={TourDataFetching} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
