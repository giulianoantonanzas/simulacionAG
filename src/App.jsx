import * as React from 'react';

import NavBar from './components/nav-bar/NavBar'
import Footer from './components/Footer/Footer'
import Content from './components/Content/Content';

import {PasoProvider} from './context/PasoContext'


function App() {
  return (
    <div >
      <PasoProvider>
      <NavBar />
      <Content />
      </PasoProvider>
      <Footer />
    </div>
  );
}

export default App;
