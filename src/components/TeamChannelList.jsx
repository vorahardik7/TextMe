import React from 'react';
import { AddChannel } from './../assets/AddChannel';
import { AiOutlineUserAdd } from 'react-icons/ai'
export const TeamChannelList = ({ setToggleContainer, isCreating, setIsCreating, setCreateType, setIsEditing, children, error = false, loading, type }) => {

    if (error) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error! Please try again.
                </p>
            </div>
        ) : null
    }

    if (loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading..
                </p>
            </div>
        )
    }

    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AiOutlineUserAdd
                    size={20}
                    style={{ marginTop: '10px' }}
                    type={type === 'team' ? 'team' : 'messaging'}
                    onClick={() => {
                        setCreateType(type);
                        setIsCreating((prevState) => !prevState);
                        setIsEditing(false);
                        if (setToggleContainer) setToggleContainer((prevState) => !prevState)
                    }}
                />
            </div>
            {/* {children} */}
            <span style={{ fontFamily: 'Lato', textAlign: 'center' }}>{children}</span>
        </div>
    )
}
