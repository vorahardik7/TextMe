import React, { useState, useEffect } from 'react'
import { getChannel, useChatContext } from 'stream-chat-react';
import { BsSearch } from 'react-icons/bs';

export const ChannelSearch = () => {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const getChannels = async (text) => {
        try {
            // Get the channels TODO
        } catch (error) {
            setQuery('')
        }
    }
    const onSearch = e => {
        e.preventDefault();
        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
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
        </div>
    )
}
