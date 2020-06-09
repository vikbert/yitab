import React, {useState} from 'react';
import './menu.less';
import {useRecoilState} from 'recoil';
import {menuVisibility} from '../../options/YiTab';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(menuVisibility);

  return (
    <div className={menuOpen ? 'menu open' : 'menu'} onClick={() => setMenuOpen(!menuOpen)}>
      <span />
      <span />
      <span />
    </div>
  );
};

export default Menu;
