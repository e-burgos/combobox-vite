import React from 'react';
import { Wrapper } from './App.styles';
import Footer from './components/Footer/Footer';
import HandleData from './components/HandleData/HandleData';

function App() {
  return (
    <Wrapper>
      <HandleData localData={false} />
      <Footer />
    </Wrapper>
  );
}

export default App;
