"use client"
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import ChatItem from "./ChatItem"

const ChatList = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const case_id = Cookies.get('patientId');
      const response = await fetch(`http://c072951.r15.vip.cpolar.cn//v1/conversations?user=${case_id}&last_id=&limit=20`, {
        method: "GET",
        headers: {
          Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm'
        }
      });
      const data = await response.json();
      // 按照 created_at 时间从大到小排序
      const sortedData = data.data.sort((a, b) => b.created_at - a.created_at);
      // 提取排序后的 name
      const names = sortedData.map(item => item.name);
      setNames(names);
    }

    fetchData();
  }, []);

  return (
    <div className='table-1 mb-[48px] mt-2 flex flex-col overflow-y-auto'>
      <ul>
        {names.map((name, index) => (
          <ChatItem key={name, index} />
        ))}
      </ul>
    </div>
  );
}

export default ChatList
