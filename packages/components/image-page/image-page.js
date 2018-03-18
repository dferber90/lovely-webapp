import React from 'react';
import { Helmet } from 'react-helmet';
import partyParrotUrl from '../assets/party-parrot.png';

export const ImagePage = () => (
  <div>
    <Helmet>
      <title>Image Example - Webapp</title>
    </Helmet>
    <img src={partyParrotUrl} alt="party-parrot" />!!
  </div>
);
