import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelListContainer } from './components/ChannelListContainer';
import { ChannelContainer } from './components/ChannelContainer';

const API_KEY = 'zq3zuxmr9vj5';

const client = StreamChat.getInstance(API_KEY);
function App() {
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
