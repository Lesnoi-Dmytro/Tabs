import {ITab} from "../../interfaces/ITab.ts";
import styles from './tabs.module.css';
import Tab from "./Tab.tsx";
import React, {DragEvent, useContext, useEffect, useRef, useState} from "react";
import {ITabsContext} from "../../interfaces/ITabsContext.ts";
import TabsContext from "../../utils/contexts/TabsContext.ts";
import {Link} from "react-router-dom";
import ContextMenu from "./ContextMenu.tsx";
import DraggedTab from "./DraggedTab.tsx";

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

    const handleOnClick = (e: React.MouseEvent) => {
        if (e.button === 0) {
            context.setters.setClickedIndex(index)
        }
    }

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowContext(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setContextXPos(e.clientX - rect.left);
        setContextYPos(e.clientY - rect.top);
    }

    const handleDragStart = (e: DragEvent<HTMLAnchorElement>) => {
        setDragged(true);
        context.setters.setClickedIndex(index);

        mouseStartPos.current[0] = e.clientX;
        mouseStartPos.current[1] = e.clientY;

        e.dataTransfer.setDragImage(new Image(), 0, 0);
    }

    const handleDragMove = (e: DragEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setXPos(e.clientX - rect.left);
        setYPos(e.clientY - rect.top);
    }

    const handleDragEnd = () => {
        setDragged(false);
        setXPos(0);
        setYPos(0);
    }

    const handleDragEnter = () => {
        const draggedIndex = context.data.clickedIndex;

        if (draggedIndex === index) {
            return;
        }

        context.setters.setMainTabs((prev) => {
            const newTabs = [...prev];

            if (draggedIndex > index) {
                for (let i = draggedIndex; i > index; i--) {
                    const saveTab = newTabs[i];
                    newTabs[i] = newTabs[i - 1];
                    newTabs[i - 1] = saveTab;
                }
            } else {
                for (let i = draggedIndex; i < index; i++) {
                    const saveTab = newTabs[i];
                    newTabs[i] = newTabs[i + 1];
                    newTabs[i + 1] = saveTab;
                }
            }


            return newTabs;
        });

        context.setters.setClickedIndex(index);
    }

    return (
        <div className={styles.mainTabWrapper}>
            <Link to={tab.path}
                  draggable='true'
                  className={`${styles.mainTab} 
                ${clicked ? styles.mainTabClicked : ''}
                ${dragged ? styles.mainTabDragged : ''}`}
                  onMouseDown={handleOnClick}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  onDrag={handleDragMove}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={handleDragEnter}>
                <Tab tab={tab}/>
            </Link>
            <ContextMenu index={index} show={showContext}
                         xPos={contextXPos} yPos={contextYPos}/>
            {dragged && <DraggedTab tab={tab} xPos={xPos} yPos={yPos}/>}
        </div>
    )
}

export default MainTab