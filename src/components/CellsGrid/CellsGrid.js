import React, {useEffect, useState} from "react";
import './CellsGrid.scss'
import {useDispatch, useSelector} from "react-redux";
import {addSelectedGrid} from '../../reduxToolkit/reducers/mainReducer'
import ButtonsBlock from "./ButtonsBlock/ButtonsBlock";
import {createCellsGrid} from "../../utils/createCellsGrid";
let CellsGrid = () => {
    const dispatch = useDispatch()
    const selectedGrid = useSelector(state => state.mainReducer.selectedGrid)

    let [cells, setCells] = useState(createCellsGrid())
    let [isStartLife, setIsStartLife] = React.useState(false)
    let [stepInterval, setStepInterval] = React.useState(100)
    let [isMouseDown, setIsMouseDown] = React.useState(false)
    useEffect(() => {
        if (isStartLife) {
            let timerID = setInterval(() => {startLifeProcess()
            }, stepInterval)

            return () => clearTimeout(timerID)
        }
        if (selectedGrid) {
            setCells(selectedGrid)
            dispatch(addSelectedGrid(null))
        }
    }, [cells, selectedGrid])

    let setCell = (x, y) => {
        let newCells = JSON.parse(JSON.stringify(cells))
        newCells[y][x] = 1
        setCells([...newCells])
    }

    let deleteCell = (x, y) => {
        let newCells = JSON.parse(JSON.stringify(cells))
        newCells[y][x] = 0
        setCells([...newCells])
    }

    let resetGrid = () => {
        setCells(createCellsGrid())
    }

    let isSurvive = (y, x) => {
        let livingCells = []
        let rows;
        let block;
        if (y === 0) {
            rows = cells.slice(y, y + 2)
        } else if (y === cells.length - 1) {
            rows = cells.slice(y - 1, y + 1)
        } else {
            rows = cells.slice(y - 1, y + 2)
        }

        if (x === 0) {
            block = rows.map(row => row.slice(x, x + 2))
        } else if (y === cells.length - 1) {
            block = rows.map(row => row.slice(x - 1, x + 1))
        } else {
            block = rows.map(row => row.slice(x - 1, x + 2))
        }

        block.forEach(row => row.forEach(cell => cell === 1 && livingCells.push(cell)))
        livingCells.splice(0, 1)
        return livingCells.length === 2 || livingCells.length === 3;
    }

    let isBirth = (y, x) => {
        let livingCells = []
        let rows;
        let block;
        if (y === 0) {
            rows = cells.slice(y, y + 2)
        } else if (y === cells.length - 1) {
            rows = cells.slice(y - 1, y + 1)
        } else {
            rows = cells.slice(y - 1, y + 2)
        }

        if (x === 0) {
            block = rows.map(row => row.slice(x, x + 2))
        } else if (y === cells.length - 1) {
            block = rows.map(row => row.slice(x - 1, x + 1))
        } else {
            block = rows.map(row => row.slice(x - 1, x + 2))
        }
        block.forEach(row => row.forEach(cell => cell === 1 && livingCells.push(cell)))
        return livingCells.length === 3
    }

    let startLifeProcess = () => {
        let newCells = []
        cells.forEach(row => newCells.push(row.slice(0)))
        cells.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 0) {
                    if (isBirth(y, x)) {
                        newCells[y][x] = 1
                    }
                } else if (cell === 1) {
                    if (!isSurvive(y, x)) {
                        newCells[y][x] = 0
                    }
                }
            })
        })
        JSON.stringify(newCells) === JSON.stringify(cells) && setIsStartLife(false)
        setCells([...newCells])
    }

    return (
        <div>
            <ButtonsBlock stepInterval={stepInterval} setStepInterval={setStepInterval} resetGrid={resetGrid}
            setIsStartLife={setIsStartLife} isStartLife={isStartLife} startLifeProcess={startLifeProcess} cells={cells}/>
            {cells.map((row, y) => (
                <div key={y} style={{display: 'flex'}}>
                    {row.map((cell, x) => (
                        <div key={x} className={cell ? 'cellStyleFill' : 'cellStyleEmpty'}
                             // style={{backgroundColor: (y < 26 && y > 23) && (x < 26 && x > 23) && 'blue'}}
                             onClick={() => cell === 1 ? deleteCell(x, y) : setCell(x, y)}
                             onMouseDown={() => setIsMouseDown(true)}
                             onMouseUp={() => setIsMouseDown(false)}
                             onMouseEnter={() => {if (isMouseDown) {
                                 cell === 1 ? deleteCell(x, y) : setCell(x, y)
                             }}}
                        >{''}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CellsGrid;