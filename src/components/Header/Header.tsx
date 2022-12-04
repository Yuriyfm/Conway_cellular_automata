import React from "react";
import './Header.scss'
import {Dispatch, SetStateAction, useState} from "react";

interface IProps {
    showAboutInfo: boolean;
    setShowAboutInfo?: Dispatch<SetStateAction<boolean>>;
}


export const Header = ({showAboutInfo, setShowAboutInfo}: IProps) => {
    return (
        <nav className={'App-header'}>
            <span className={'title'}>John Conway's "Game of Life"</span>
            <span className={'navItem'} style={{color: showAboutInfo && '#b3a7a7'}}
                  onClick={() => setShowAboutInfo(!showAboutInfo)}
            >Об игре</span>

        </nav>
    )
}