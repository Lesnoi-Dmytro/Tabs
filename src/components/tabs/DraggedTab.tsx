import Tab from "./Tab.tsx";
import {ITab} from "../../interfaces/ITab.ts";
import styles from './tabs.module.css';

const DraggedTab = ({tab, xPos, yPos}: { tab: ITab, xPos: number, yPos: number }) => {
    return (
        <div className={styles.draggedTab} style={{
            top: yPos,
            left: xPos
        }}>
            <Tab tab={tab}></Tab>
        </div>
    )
}

export default DraggedTab;