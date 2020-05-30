import TabType from './TabType';

export const createNewTab = (title: string, url: string): TabType => ({
    id: Date.now(),
    favIconUrl: null,
    title: title,
    url: url,
    status: 'completed',
    pinned: false,
});
