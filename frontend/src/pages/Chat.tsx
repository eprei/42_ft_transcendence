import Navbar from '../components/navigation/Navbar'
import ChatBox from '../components/chat/ChatBox'

const Chat = () => {
    return (
        <>
            <h1>Chat</h1>
			<ChatBox />
        </>
    )
}

{/* //  return (
//     <div>
//       <Header />
//       <Row>
//         <Col span={20}>
//           <ChatFeed
//             userName={userName}
//             currentChannelId={currentChannelId}
//             setCurrentChannelId={setCurrentChannelId}
//           />
//         </Col>
//         <Col span={4}>
//           <SideBar
//             userName={userName}
//             currentChannelId={currentChannelId}
//             setCurrentChannelId={setCurrentChannelId}
//           />
//         </Col>
//       </Row>
//     </div>
//   ); */}

export default Chat
