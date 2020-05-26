import TabType from './TabType';
import TabSetType from './TabSetType';

export const createNewTabSet = (tabs: Array<TabType>): TabSetType => ({
    createdAt: (new Date()).getTime(),
    isStarred: false,
    isLocked: false,
    title: '',
    tabs,
});
