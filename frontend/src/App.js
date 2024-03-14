import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupScreen from './component/SignupScreen';
import PostScreen from './component/PostScreen';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/"
            element = {<SignupScreen />}
          />
          <Route path="/post"
            element = {<PostScreen/>}
          />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
