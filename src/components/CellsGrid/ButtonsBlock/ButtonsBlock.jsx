import React from 'react';
import {addPattern, addSelectedGrid} from "../../../reduxToolkit/reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";

const ButtonsBlock = ({stepInterval, setStepInterval, resetGrid,
                        setIsStartLife, isStartLife, startLifeProcess, cells}) => {
  const dispatch = useDispatch()
  const lastPatterns = useSelector(state => state.mainReducer.lastPatterns)

  const handleSelectChange = (e) => {
    setIsStartLife(false)
    dispatch(addSelectedGrid(lastPatterns[+e.target.value].grid))
  }
  return (
    <>
      <div className={'buttonsContainer'}>
        <span>скорость шага (мс.)</span>
        <input type="number" value={stepInterval} step={50}
               onChange={(e) => setStepInterval(+e.target.value)}/>
        <div>
          <button className={'button'} onClick={() => {
            resetGrid()
            setIsStartLife(false)
          }}>обновить</button>
          {isStartLife ? (
            <button className={'button'} onClick={() => {
              setIsStartLife(false)
            }}>Стоп
            </button>
          ) : (
            <button className={'button'}  onClick={() => {
              setIsStartLife(true)
              startLifeProcess()
            }}>Старт
            </button>
          )}
          {/*<button className={'button'}  onClick={() => {*/}
          {/*  dispatch(addPattern({grid: cells, name: `фигура № ${lastPatterns.length + 1}`}))*/}
          {/*}}>Сохранить фигуру*/}
          {/*</button>*/}
        </div>
      </div>
      <div>
        <label htmlFor="selectFigure">Выбрать готовую фигуру:</label>
        <select className="selectFigure" id={'selectFigure'} onChange={(e) => {
          handleSelectChange(e)
        }}>
          {lastPatterns.map((pattern, index) => (
            <option key={index} value={index}>{pattern.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ButtonsBlock;