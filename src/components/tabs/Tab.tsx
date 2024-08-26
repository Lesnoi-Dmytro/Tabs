import {ITab} from "../../interfaces/ITab.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './tabs.module.css';

const Tab = ({tab}: {tab: ITab}) => {
    return (
        <div className={styles.tab}>
            <FontAwesomeIcon className={styles.tabIcon} icon={tab.icon}/>
            <h3>{tab.title}</h3>
        </div>
    )
}

export default Tab;