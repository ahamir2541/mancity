import React from 'react';
import Layout from './Hoc/Layout'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import TheTeam from './Components/TheTeam/TheTeam'
import TheMatches from './Components/TheMatches/TheMatches'
import NotFound from './Components/UI/NotFound'

import Dashboard from './Components/Admin/Dashboard'
import AdminMatches from './Components/Admin/Matches/AdminMatches'
import AddEditMatches from './Components/Admin/Matches/AddEditMatches'
import AdminPlayers from './Components/Admin/Players/AdminPlayers'
import AddEditPlayers from './Components/Admin/Players/AddEditPlayers'

import PrivateRoutes from './Components/authRoutes/PrivateRoutes'
import PublicRoutes from './Components/authRoutes/PublicRoutes'

const routes = (props) => {

  return (
    <Layout>
      <Switch>

        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
        <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches} />
        <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatches} />
        <PrivateRoutes {...props} path="/admin_matches/edit_match" exact component={AddEditMatches} />
        <PrivateRoutes {...props} path="/admin_players" exact component={AdminPlayers} />
        <PrivateRoutes {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
        <PrivateRoutes {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />

        <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn} />
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted={false} path="/the_team" exact component={TheTeam} />
        <PublicRoutes {...props} restricted={false} path="/the_matches" exact component={TheMatches} />
        <PublicRoutes {...props} restricted={false} component={NotFound} />
        
      </Switch>
    </Layout>
  );
};

export default routes;