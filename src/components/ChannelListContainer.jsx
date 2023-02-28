import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { SideBar } from './SideBar';
import { ChannelSearch } from './ChannelSearch';
import { TeamChannelList } from './TeamChannelList';
import { TeamChannelPreview } from './TeamChannelPreview';

const cookies = new Cookies();

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">TextMe</p>
    </div>
)


export const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {

    const logout = () => {
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('hashedPass,ord');
        cookies.remove('phoneNumb,r');
        cookies.remove('avatarURL');
        window.location.reload();
    }
    return (
        <>
            <SideBar logout={logout} />
            <div className='channel-list__list__wrapper'>
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            type="team"

                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                        />
                    )}
                />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            type="messaging"
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}
