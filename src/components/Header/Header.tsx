import React, {useEffect, useRef} from "react";
import './Header.scss'
import {Dispatch, SetStateAction, useState} from "react";

interface IProps {
    showAboutInfo: boolean;
    setShowAboutInfo?: Dispatch<SetStateAction<boolean>>;
}


export const Header = ({showAboutInfo, setShowAboutInfo}: IProps) => {
    let headerRef = useRef(null);

    return (
        <nav className={'App-header'} ref={headerRef}>
            <span className={'title'}>John Conway's "Game of Life"</span>
            <span className={'navItem'} style={{color: showAboutInfo && '#b3a7a7'}}
                  onClick={() => setShowAboutInfo(!showAboutInfo)}
            >Об игре</span>

        </nav>
    )
}