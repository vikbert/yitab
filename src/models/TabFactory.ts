import TabType from './TabType';

export const createNewTab = (title: string, url: string): TabType => ({
    id: Date.now(),
    favIconUrl: '/favicon.ico',
    title: title,
    url: url,
    status: 'completed',
    pinned: false,
});
