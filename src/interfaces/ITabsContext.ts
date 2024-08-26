import {ITab} from "./ITab.ts";
import {SetStateAction} from "react";

interface ITabsContext {
    data: {
        mainTabs: ITab[],
        pinnedTabs: ITab[],
        clickedIndex: number;
    },
    setters: {
        setClickedIndex: (index: number) => void;
        setMainTabs: (value: SetStateAction<ITab[]>) => void;
        setPinnedTabs: (value: SetStateAction<ITab[]>) => void;
    }
}

export type {ITabsContext};