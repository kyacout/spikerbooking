import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Search } from './Search'
import { CreateVenueProfile } from './CreateVenueProfile'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/create-venue-profile" component={CreateVenueProfile} />
    </Switch>
  )
}
