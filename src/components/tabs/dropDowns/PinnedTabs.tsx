import styles from '../tabs.module.css';
import {useContext} from "react";
import TabsContext from "../../../utils/contexts/TabsContext.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tab from "../Tab.tsx";
import {Link} from "react-router-dom";

const PinnedTabs = () => {
    const context = useContext(TabsContext);

    const isShown = () => {
        return context.data.clickedIndex === -1;
    }

    return (
        <div className={styles.dropDownElement}>
            <div className={`${styles.mainTab}
            ${isShown() ? styles.mainTabClicked : ''}
            ${styles.pinnedTab}
            ${styles.pinnedLeft}`}
                 onClick={() => context.setters.setClickedIndex(-1)}>
                <FontAwesomeIcon icon='box'/>
            </div>
            {isShown() && <div className={`${styles.dropDownContent}`}>
                {context.data.pinnedTabs.map(tab =>
                    <Link to={tab.path} key={tab.id}>
                        <Tab tab={tab}/>
                    </Link>
                )}
            </div>}
        </div>
    )
}

export default PinnedTabs;