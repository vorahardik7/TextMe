import React, { useState, useEffect } from 'react'
import { getChannel, useChatContext } from 'stream-chat-react';
import { BsSearch } from 'react-icons/bs';
import { ResultsDropdown } from './ResultsDropdown';

export const ChannelSearch = ({ setToggleContainer }) => {

    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])

    useEffect(() => {
        if (!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query])

    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                type: 'team',
                name: { $autocomplete: text },
                members: { $in: [client.userID] }
            });
            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            })

            const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

            if (channels.length) {
                setTeamChannels(channels);
            } else {
                setTeamChannels([]);
            }
            if (users.length) {
                setDirectChannels(users)
            } else {
                setDirectChannels([]);
            }
        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (event) => {

        setLoading(true);
        setQuery(event.target.value);
        if (event.target.value) {
            getChannels(event.target.value);
        }
        setLoading(false);
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }


    return (
        <div className='channel-search__container'>
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <BsSearch />
                </div>
                <input className="channel-search__input__text"
                    placeholder='Search'
                    value={query}
                    type="text"
                    onChange={onSearch}
                />
            </div>
            {query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    )
}
