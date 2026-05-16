import { useState, useRef, useEffect } from 'react';
import ChatBubble from './components/ChatBubble';
import MessageInput from './components/MessageInput';
import Header from './components/Header';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const scrollViewRef = useRef();
  useEffect(() => {
  loadMessages();
}, []);
const clearChat = async () => {
  try {
    await AsyncStorage.removeItem(
      'messages'
    );

    setMessages([
      {
        role: 'ai',
        text: 'هلا شلون أگدر أساعدك؟',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  saveMessages();
}, [messages]);

const saveMessages = async () => {
  try {
    await AsyncStorage.setItem(
      'messages',
      JSON.stringify(messages)
    );
  } catch (error) {
    console.log(error);
  }
};

const loadMessages = async () => {
  try {
    const savedMessages =
      await AsyncStorage.getItem('messages');

    if (savedMessages !== null) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          role: 'ai',
          text: 'هلا شلون أگدر أساعدك؟',
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user',
      text: message,
    };

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = message;

    setMessage('');

    setLoading(true);

    try {
      const response = await fetch(
        'https://nova-ai-backend-mryn.onrender.com/chat',
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

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
      keyboardVerticalOffset={20}
      style={{
        flex: 1,
        backgroundColor: '#0f172a',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#0f172a',
          
        }}
      >
       <Header clearChat={clearChat} />

        <ScrollView
          ref={scrollViewRef}
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({
              animated: true,
            })
          }
        >
          {messages.map((item, index) => (
  <ChatBubble
    key={index}
    item={item}
  />
))}

          {loading && (
            <View
              style={{
                backgroundColor: '#1e293b',
                padding: 15,
                borderRadius: 18,
                marginBottom: 10,
                alignSelf: 'flex-start',
                maxWidth: '80%',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}
              >
                AI is typing...
              </Text>
            </View>
          )}
        </ScrollView>

      <MessageInput
  message={message}
  setMessage={setMessage}
  sendMessage={sendMessage}
  loading={loading}
/>
      </View>
    </KeyboardAvoidingView>
  );
}