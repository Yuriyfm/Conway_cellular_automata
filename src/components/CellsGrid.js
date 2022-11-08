import React, {useEffect, useState} from "react";


let CellsGrid = () => {

    let cellSize = 14;
    let gridWidth = 50
    let gridHeight = 50

    let createCellsGrid = () => {
        return Array(gridWidth).fill(0).map(row => new Array(gridHeight).fill(0))
    }

    let [cells, setCells] = useState(createCellsGrid())
    let [isStartLife, setIsStartLife] = useState(false)
    let [stepInterval, setStepInterval] = useState(1000)

    useEffect(() => {
        if (isStartLife) {
            let timerID = setInterval(() => {startLifeProcess()
            }, stepInterval)
            return () => clearTimeout(timerID)
        }
    }, [cells])

    let setCell = (x, y) => {
        let newCells = cells
        newCells[y][x] = 1
        setCells([...newCells])
    }

    let deleteCell = (x, y) => {
        let newCells = cells
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
            <div style={{margin: 10, display: "flex", justifyContent: 'center'}}>
                <div style={{marginRight: 20}}>
                    <span style={{marginRight: 10}}>скорость шага (мс.)</span>
                    <input type="number" onChange={(e) => setStepInterval(+e.target.value)}/>
                </div>
                <button style={{marginRight: 20}} onClick={() => {
                    resetGrid()
                    setIsStartLife(false)
                }}>обновить</button>
                <button onClick={() => {
                    setIsStartLife(true)
                    startLifeProcess()
                }}>старт
                </button>
            </div>
            {cells.map((row, y) => (
                <div key={y} style={{display: 'flex'}}>
                    {row.map((cell, x) => (
                        <div key={x} style={{
                            height: cellSize, width: cellSize,
                            border: '1px solid lightgrey', backgroundColor: cell === 1 && 'red'
                        }}
                             onClick={() => cell === 1 ? deleteCell(x, y) : setCell(x, y)}
                        >{''}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CellsGrid;