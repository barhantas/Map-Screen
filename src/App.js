import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import MapScreen from './pages/MapScreen';
// import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Work from './pages/Work';
import { AppWrapper } from './components/StyledComponents';

function App(props) {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MapScreen} {...props} />
          <Route exact path="/about" component={About} {...props} />
          <Route exact path="/contact" component={Contact} {...props} />
          <Route exact path="/work" component={Work} {...props} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
