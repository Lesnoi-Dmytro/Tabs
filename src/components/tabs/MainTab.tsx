import {ITab} from "../../interfaces/ITab.ts";
import styles from './tabs.module.css';
import Tab from "./Tab.tsx";
import {DragEvent, useContext, useEffect, useRef, useState} from "react";
import {ITabsContext} from "../../interfaces/ITabsContext.ts";
import TabsContext from "../../utils/contexts/TabsContext.ts";
import {Link} from "react-router-dom";
import ContextMenu from "./ContextMenu.tsx";

const MainTab = ({clicked, tab, index}: { clicked: boolean, tab: ITab, index: number }) => {
    const context = useContext<ITabsContext>(TabsContext);

    const [showContext, setShowContext] = useState(false);
    useEffect(() => {
        const handleDocumentClick = () => {
            setShowContext(false);
        }

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    const mouseStartPos = useRef<number[]>([0, 0]);

    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);

    const [contextXPos, setContextXPos] = useState(0);
    const [contextYPos, setContextYPos] = useState(0);

    const [dragged, setDragged] = useState(false);

    const handleOnClick = (e: MouseEvent) => {
        if (e.button === 0) {
            context.setters.setClickedIndex(index)
        }
    }

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setShowContext(true);
        setContextXPos(e.clientX);
        setContextYPos(e.clientY);
    }

    const handleDragStart = (e: DragEvent<HTMLAnchorElement>) => {
        setDragged(true);
        context.setters.setClickedIndex(index);

        mouseStartPos.current[0] = e.clientX;
        mouseStartPos.current[1] = e.clientY;

        e.dataTransfer.setDragImage(new Image(), 0, 0);
    }

    const handleDragMove = (e: DragEvent<HTMLAnchorElement>) => {
        setXPos(e.clientX - mouseStartPos.current[0]);
        setYPos(e.clientY - mouseStartPos.current[1]);
    }

    const handleDragEnd = () => {
        setDragged(false);
        setXPos(0);
        setYPos(0);
    }

    const handleDrop = () => {
        const draggedIndex = context.data.clickedIndex;
        const dragged = context.data.mainTabs[draggedIndex];

        if (draggedIndex === index) {
            return;
        }

        context.setters.setMainTabs((prev) => {
            const newTabs = [...prev];

            newTabs[index] = dragged;
            newTabs[draggedIndex] = tab;

            return newTabs;
        });

        context.setters.setClickedIndex(index);
    }

    return (
        <>
            <Link to={tab.path}
                  draggable='true'
                  className={`${styles.mainTab} 
                ${clicked ? styles.mainTabClicked : ''}
                ${dragged ? styles.mainTabDragged : ''}`}
                  style={{
                      top: yPos,
                      left: xPos
                  }}
                  onMouseDown={handleOnClick}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  onDrag={handleDragMove}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
            >
                <Tab tab={tab}/>
            </Link>
            <ContextMenu index={index} show={showContext}
                         xPos={contextXPos} yPos={contextYPos}/>
        </>
    )
}

export default MainTab