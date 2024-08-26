import PinnedTabs from "./dropDowns/PinnedTabs.tsx";
import {ITab} from "../../interfaces/ITab.ts";
import styles from './tabs.module.css';
import MainTab from "./MainTab.tsx";
import {useEffect, useState} from "react";
import TabsContext from "../../utils/contexts/TabsContext.ts";
import {ITabsContext} from "../../interfaces/ITabsContext.ts";
import DropDown from "./dropDowns/DropDown.tsx";
import TabsService from "../../services/TabsService.ts";

const tabsService = new TabsService();

const Tabs = () => {
    const [clickedIndex, setClickedIndex] = useState(0);

    const [pinnedTabs, setPinnedTabs] =
        useState<ITab[]>(tabsService.loadPinnedTabs);

    const [mainTabs, setMainTabs] =
        useState<ITab[]>(tabsService.loadMainTabs());

    useEffect(() => {
        tabsService.saveMainTabs(mainTabs);
    }, [mainTabs]);

    useEffect(() => {
        tabsService.savePinnedTabs(pinnedTabs);
    }, [pinnedTabs]);

    const context: ITabsContext = {
        data: {
            mainTabs,
            pinnedTabs,
            clickedIndex
        },
        setters: {
            setClickedIndex,
            setMainTabs,
            setPinnedTabs
        }
    }

    return (
        <TabsContext.Provider value={context}>
            <div className={styles.tabs}>
                <PinnedTabs/>
                {mainTabs.map((tab, i) =>
                    <MainTab clicked={i === clickedIndex}
                             key={tab.id} tab={tab} index={i}/>)}
                <DropDown/>
            </div>
        </TabsContext.Provider>
    )
}

export default Tabs;