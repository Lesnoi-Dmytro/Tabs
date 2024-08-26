import {Outlet} from "react-router-dom";
import styles from './content.module.css';

const Content = () => {
    return (
        <div className={styles.content}>
            <Outlet></Outlet>
        </div>
    )
}

export default Content;