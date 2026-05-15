import { useState } from 'react';

import {
  View,
 Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'هلا شلون أگدر أساعدك؟',
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user',
      text: message,
    };

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = message;

    setMessage('');

    try {
      const response = await fetch(
        'http://192.168.0.105:5000/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      const data = await response.json();

      const aiMessage = {
        role: 'ai',
        text: data.reply,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0f172a',
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        AI Chat 🚀
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {messages.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                item.role === 'user'
                  ? '#2563eb'
                  : '#1e293b',

              padding: 15,
              borderRadius: 15,
              marginBottom: 10,
              alignSelf:
                item.role === 'user'
                  ? 'flex-end'
                  : 'flex-start',

              maxWidth: '80%',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: 30,
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="اكتب رسالة..."
          placeholderTextColor="#94a3b8"
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            color: 'white',
            borderRadius: 15,
            paddingHorizontal: 15,
            height: 55,
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: '#2563eb',
            marginLeft: 10,
            width: 70,
            height: 55,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}