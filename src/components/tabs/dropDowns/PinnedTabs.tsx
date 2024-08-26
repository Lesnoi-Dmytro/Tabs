import styles from '../tabs.module.css';
import {useContext} from "react";
import TabsContext from "../../../utils/contexts/TabsContext.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tab from "../Tab.tsx";

const PinnedTabs = () => {
    const context = useContext(TabsContext);

    return (
        <div className={styles.dropDownElement}>
            <div className={`${styles.mainTab}
            ${context.data.clickedIndex === -1 ? styles.mainTabClicked : ''}
            ${styles.pinnedTab}
            ${styles.pinnedLeft}`}
                 onClick={() => context.setters.setClickedIndex(-1)}>
                <FontAwesomeIcon icon='box'/>
            </div>
            <div className={`${styles.dropDownContent}`}>
                {context.data.pinnedTabs.map(tab =>
                    <Tab tab={tab} key={tab.id}/>)}
            </div>
        </div>
    )
}

export default PinnedTabs;