import React from 'react';
import {useRecoilValue} from 'recoil';
import {menuVisibility} from '../../options/YiTab';
import './sidebar.less';

export default function Sidebar() {
  const menuOpen = useRecoilValue(menuVisibility);

  return (
    <div className={`sidebar ${menuOpen && 'open'}`}>
      <div className="sidebar-item">import bookmarks</div>
    </div>
  );
}
