import styles from '../tabs.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

const DropDown = () => {
    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <div className={`${styles.pinnedTab}
                        ${styles.pinnedRight}
                        ${styles.dropDown}`}
             onClick={() => setClicked((prev) => !prev)}>
            <FontAwesomeIcon className={clicked ? '' : styles.reversed} icon={'arrow-up'}/>
        </div>
    )
}

export default DropDown;