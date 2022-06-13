import * as React from 'react'
import { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Context } from './App'
import { Search } from '../pages/Search'
import { CreateVenueProfile } from '../pages/CreateVenueProfile'
import { CreateArtistProfile } from '../pages/CreateArtistProfile'
import { VenuesList } from '../pages/VenuesList'
import { ArtistsList } from '../pages/ArtistsList'
import { ArtistDetails } from '../pages/ArtistDetails'
import { VenueDetails } from '../pages/VenueDetails'
import { EditProfile } from '../pages/EditProfile'
import { Logout } from './devise/Logout'
import { PageNotFound } from '../pages/PageNotFound'
import { ViewProfile } from '../pages/ViewProfile'
import { LoginRedirect } from '../pages/LoginRedirect'

const CommonRoutes = (
  <>
    <Route exact path="/" component={Search} />
    <Route exact path="/artists" component={ArtistsList} />
    <Route exact path="/venues" component={VenuesList} />
    <Route exact path="/artists-search/:query" component={ArtistsList} />
    <Route exact path="/venues-search/:query" component={VenuesList} />
    <Route exact path="/artists/:id" component={ArtistDetails} />
    <Route exact path="/venues/:id" component={VenueDetails} />
    <Route path="*" component={PageNotFound} />
  </>
)

const AuthenticatedOnlyRoutes = (
  <Switch>
    <Route exact path="/create-artist-profile" component={CreateArtistProfile} />
    <Route exact path="/create-venue-profile" component={CreateVenueProfile} />
    <Route exact path="/edit-profile/" component={EditProfile} />
    <Route exact path="/view-profile" component={ViewProfile} />
    <Route exact path="/logout" component={Logout} />
    {CommonRoutes}
  </Switch>
)

const NonAuthenticatedOnlyRoutes = <Switch>{CommonRoutes}</Switch>

export default function Routes() {
  const { currentUser } = useContext(Context)
  return currentUser ? AuthenticatedOnlyRoutes : NonAuthenticatedOnlyRoutes
}
