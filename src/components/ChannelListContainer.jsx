import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { SideBar } from './SideBar';
import { ChannelSearch } from './ChannelSearch';
import { TeamChannelList } from './TeamChannelList';
import { TeamChannelPreview } from './TeamChannelPreview';


const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">TextMe</p>
    </div>
)


export const ChannelListContainer = () => {
    return (
        <>
            <SideBar />
            <div className='channel-list__list__wrapper'>
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                        />
                    )}
                    Preview={previewProp => {
                        <TeamChannelPreview
                            {...previewProp}
                            type="team"
                        />
                    }}
                />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                        />
                    )}
                    Preview={previewProp => {
                        <TeamChannelPreview
                            {...previewProp}
                            type="messaging"
                        />
                    }}
                />
            </div>
        </>
    )
}
