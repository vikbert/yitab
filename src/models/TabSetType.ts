import TabType from './TabType';

interface TabSetType {
    createdAt: number;
    tabs: Array<TabType>;
    isStarred: boolean;
    isLocked: boolean;
    title?: string;
}

export default TabSetType;
