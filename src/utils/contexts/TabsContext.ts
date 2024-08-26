import {createContext} from "react";
import {ITabsContext} from "../../interfaces/ITabsContext.ts";

const TabsContext = createContext<ITabsContext>({
    data: {
        mainTabs: [],
        clickedIndex: 0
    },
    setters: {
        setClickedIndex: () => {}
    }
});

export default TabsContext;