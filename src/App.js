import './App.scss';
import React, {useState} from "react";
import CellsGrid from "./components/CellsGrid/CellsGrid";
import About from "./components/About/About";
import {Header} from "./components/Header/Header";
import {useDispatch, useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch()
  let [showAboutInfo, setShowAboutInfo] = useState(false)
  const lastPatterns = useSelector(state => state.mainReducer.lastPatterns)
  console.log(lastPatterns)
  return (
    <>
      <Header showAboutInfo={showAboutInfo} setShowAboutInfo={setShowAboutInfo}/>
      <div className={'AppContainer'}>
        <div className={'AboutBlock'}>
          {showAboutInfo ?
            <About/>
            :
            <></>
          }
        </div>
        <div className={'mainBlock'}>
          <CellsGrid/>
        </div>
        <div className={'rightBlock'}>
        </div>
      </div>
    </>
  );
}

export default App;
