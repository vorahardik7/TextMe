import React from 'react'

export const TeamChannelList = ({ children, error = true, loading, type }) => {

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
                    {type === 'team' ? 'Channels' : 'Messages'}
                </p>
            </div>
        )
    }



    return (
        <div className='team-channel-list'>
            <div className="team-channel-list__header">
                <p className='team-channel-list__header__title'>
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                {/* button to add channel */}
            </div>
            {children}
        </div>
    )
}
