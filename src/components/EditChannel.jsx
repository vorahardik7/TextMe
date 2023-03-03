import React, { useState, useEffect } from 'react';
import { useChatContext, Avatar } from 'stream-chat-react';
import { CloseCreateChannel } from './../assets/CloseCreateChannel';
import { UserList } from './UserList';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input style={{ marginBottom: '20px' }} value={channelName} onChange={handleChange} placeholder="channel-name" />
        </div>
    )
}

export const EditChannel = ({ setIsEditing }) => {
    const { channel, client } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [currentMem, setCurrentMem] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {

            try {
                const response = await channel?.queryMembers({ id: { $ne: client.userID } });
                console.log('response', response.members)
                if (response.members.length) {
                    setCurrentMem(response.members);
                    console.log(currentMem);

                }
            } catch (error) {
                console.log('error', error);
            }
        }
        if (channelName) getUsers();
    }, [])

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if (nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}` });
        }

        if (selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <div className="channel-name__current-members">
                <p>Current Members</p>
                {currentMem?.map(member => (
                    <div className="user-item__wrapper" key={member.user_id}>
                        <div className="user-item__name-wrapper">
                            <Avatar image={member.user.image} name={member.user.name || member.user_id} size={32} />
                            <p className="user-item__name">{member.user.name || member.user_id}</p>
                            <i style={{ color: 'gray', fontSize: '12px', marginLeft: '5px' }}>{member.user.online ? 'Online' : 'Offline'}</i>
                        </div>
                    </div>
                ))}
            </div>

            <p className='channel-name__add-members'>Add Members</p>
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div >
    )
}

