import * as React from 'react'
import { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Context } from './App'
import { Search } from '../pages/Search'
import { CreateVenueProfile } from '../pages/CreateVenueProfile'
import { CreateArtistProfile } from '../pages/CreateArtistProfile'
import { ArtistsList } from '../pages/ArtistsList'

const AuthenticatedRoutes = (
  <Switch>
    <Route exact path="/" component={Search} />
    <Route exact path="/create-venue-profile" component={CreateVenueProfile} />
    <Route exact path="/create-artist-profile" component={CreateArtistProfile} />
    <Route exact path="/artists" component={ArtistsList} />
  </Switch>
)

const NonAuthenticatedRoutes = (
  <Switch>
    <Route exact path="/" component={Search} />
    <Route exact path="/artists" component={ArtistsList} />
  </Switch>
)

export default function Routes() {
  const { currentUser } = useContext(Context)
  return currentUser ? AuthenticatedRoutes : NonAuthenticatedRoutes
}
