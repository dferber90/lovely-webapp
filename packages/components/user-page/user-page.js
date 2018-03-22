import React from 'react';
import { UserBanner } from '../user-banner';
import { Me } from '../me';

export const UserPage = () => (
  <div>
    <Me>
      {({ loading, me }) => {
        return <UserBanner loading={loading} me={me} />;
      }}
    </Me>
  </div>
);
