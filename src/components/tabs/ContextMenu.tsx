import styles from './tabs.module.css';
import {FaThumbtack} from "react-icons/fa";
import {useContext} from "react";
import TabsContext from "../../utils/contexts/TabsContext.ts";

const ContextMenu = ({index, show, xPos, yPos}: { index: number, show: boolean, xPos: number, yPos: number }) => {
    const context = useContext(TabsContext);

    if (show) {
        return (
            <div className={styles.contextMenu}
                 style={{
                     top: yPos,
                     left: xPos,
                 }}
                 onMouseDown={() => {
                     const pinned = context.data.mainTabs[index];
                     context.setters.setMainTabs((prev) => {
                         const newTabs = [...prev];
                         newTabs.splice(index, 1);
                         return newTabs;
                     });
                     context.setters.setClickedIndex(-2);
                     context.setters.setPinnedTabs(prev => {
                         const newTabs = [...prev];
                         newTabs.push(pinned);
                         return newTabs;
                     });
                 }}>
                <FaThumbtack/>
                <span>Tab anpinnen</span>
            </div>
        )
    } else {
        return <></>
    }
}

export default ContextMenu;