import React from 'react';
import { Channel, useChatContext, MessageSimple } from 'stream-chat-react';
import { EditChannel } from './EditChannel';
import { CreateChannel } from './CreateChannel';
import { ChannelInner } from './ChannelInner';

export const ChannelContainer = ({ isCreating, isEditing, setIsCreating, setIsEditing, createType }) => {

    const { channel } = useChatContext();

    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }

    const EmptyState = () => {
        <div className="channel-empty__container">
            <p className='channel-empty__first'>This is the beginning of your chat history</p>
            <p className='channel-empty__second'>Send messages, attachments, links and more...</p>
        </div>
    }

    return (
        <div className='channel__container'>
            <Channel
                emptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div >
    )
}
