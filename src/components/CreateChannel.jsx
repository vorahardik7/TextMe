import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets/CloseCreateChannel';
import { UserList } from './UserList';
import { GrSend } from 'react-icons/gr'
const ChannelNameInput = ({ channelName = '', setChannelName }) => {

    const handleChange = e => {
        e.preventDefault();
        setChannelName(e.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input
                value={channelName}
                onChange={handleChange}
                placeholder='Channel name'

            />

            <p>Add members</p>
        </div>
    )
}

export const CreateChannel = ({ createType, setIsCreating }) => {

    const [channelName, setChannelName] = useState('');
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.user.id || '']);

    const createChannel = async (e) => {
        e.preventDefault();
        try {
            const newChannel = await client.channel(createType, channelName, { name: channelName, members: selectedUsers });
            await newChannel.watch();
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.user.id || '']);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-channel__container'>
            <div className="create-channel__header">
                <p>
                    {createType === 'team' ? 'Create a new channel' : 'Send a direct message'}
                </p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>
                    {createType === 'team' ? 'Create a new channel' : 'Send message'}
                </p>
            </div>
        </div>
    )
}
