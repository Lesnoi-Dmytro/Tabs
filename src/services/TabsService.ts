import {ITab} from "../interfaces/ITab.ts";
import {v4 as uuidv4} from "uuid";

export default class TabsService {
    public loadMainTabs(): ITab[] {
        const stringTabs = localStorage.getItem('mainTabs');

        if (stringTabs) {
            return JSON.parse(stringTabs);
        } else {
            return [
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Dashboard',
                    path: '/dashboard'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Banking',
                    path: '/banking'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                },
                {
                    id: uuidv4(),
                    icon: ['fas', 'coffee'],
                    title: 'Telefonie',
                    path: '/telefonie'
                }
            ]
        }
    }

    public loadPinnedTabs(): ITab[] {
        const stringTabs = localStorage.getItem('pinnedTabs');

        if (stringTabs) {
            return JSON.parse(stringTabs);
        } else {
            return [];
        }
    }

    public saveMainTabs(tabs: ITab[]): void {
        this.save('mainTabs', tabs);
    }

    public savePinnedTabs(tabs: ITab[]): void {
        this.save('pinnedTabs', tabs);
    }

    private save(key: string, item: ITab[]) {
        localStorage.setItem(key, JSON.stringify(item));
    }
}