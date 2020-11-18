import { useState } from 'react';
import { PRIORITY } from './constants';
import { formatMessageAt, parseJwt } from './utils';
import axios from 'axios';

const App = () => {
  const [id, setId] = useState('');
  const [data, setData] = useState({});
  const [messageList, setMessageList] = useState([]);
  console.log(data, messageList);
  const handleChange = e => setId(e.target.value);

  const handleClick = () => {
    const url = `https://coding-assignment-v1.now.sh/api/v1/inbox/${id}`;
    axios.get(url).then(res => {
      const { payload } = res.data;
      const decodedData = parseJwt(payload);
      setData(decodedData);
      setMessageList(Object.values(decodedData.messages));
    });
  };

  const renderMessageList = () =>
    messageList.map(message => {
      const { messageSender, messageAt, messagePriority, messageSubject } = message;

      return (
        <tr>
          <td>{messageSender}</td>
          <td>{formatMessageAt(messageAt)}</td>
          <td>{messageSubject}</td>
          <td>{PRIORITY[messagePriority]}</td>
        </tr>
      );
    });

  return (
    <div className="App">
      <div>
        <input onChange={handleChange} />
        <button onClick={handleClick}>ID送信</button>

        <h2>受信箱のエイリアス: {data.inboxAlias}</h2>
        <h2>受信箱のID: {data.inboxId}</h2>
        <table>
          <tr>
            <th>送信者</th>
            <th>送信時間</th>
            <th>タイトル</th>
            <th>優先度</th>
          </tr>
          {renderMessageList()}
        </table>
      </div>
    </div>
  );
};

export default App;
