export async function POST(request) {
  try {
    const body = await request.json();
    const { message, user_id } = body;
    
    // 调用 Coze API 创建对话
    const response = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.COZE_API_KEY || 'pat_iFeijJKIUxxEKoV53VxcMRxRIsD27V4DFSFIUwz8MErhRuXnHPMBdsmhvWsx6e0K'}`
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_BOT_ID || '7512422022182961162',
        user_id: user_id,
        stream: false,
        auto_save_history: true,
        additional_messages: [
          {
            role: "user",
            content: message,
            content_type: "text"
          }
        ]
      })
    });
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in Coze API route:', error);
    return Response.json({ 
      code: 500, 
      message: 'Internal Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversation_id = searchParams.get('conversation_id');
    const chat_id = searchParams.get('chat_id');
    const endpoint = searchParams.get('endpoint');
    
    if (!conversation_id || !chat_id) {
      return Response.json({ 
        code: 400, 
        message: 'Missing required parameters' 
      }, { status: 400 });
    }
    
    // 获取消息列表
    if (endpoint === 'messages') {
      const url = new URL('https://api.coze.cn/v3/chat/message/list');
      url.searchParams.append('conversation_id', conversation_id);
      url.searchParams.append('chat_id', chat_id);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.COZE_API_KEY || 'your-api-key-here'}`
        }
      });
      
      const data = await response.json();
      return Response.json(data);
    }
    
    // 获取对话状态
    const url = new URL('https://api.coze.cn/v3/chat/retrieve');
    url.searchParams.append('conversation_id', conversation_id);
    url.searchParams.append('chat_id', chat_id);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_API_KEY || 'your-api-key-here'}`
      }
    });
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in Coze API route:', error);
    return Response.json({ 
      code: 500, 
      message: 'Internal Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}