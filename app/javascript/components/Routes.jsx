import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Search } from '../pages/Search'
import { CreateVenueProfile } from '../pages/CreateVenueProfile'
import { CreateArtistProfile } from '../pages/CreateArtistProfile'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/create-venue-profile" component={CreateVenueProfile} />
      <Route exact path="/create-artist-profile" component={CreateArtistProfile} />
    </Switch>
  )
}
