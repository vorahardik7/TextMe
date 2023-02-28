import React from 'react';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

export const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <BsFillChatLeftTextFill size={22} color="white" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <FiLogOut size={30} onClick={logout} color='white' />
            </div>
        </div>
    </div>
);
