import { View, Text } from 'react-native';

export default function ChatBubble({
  item,
}) {
  return (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 10,

      alignSelf:
        item.role === 'user'
          ? 'flex-end'
          : 'flex-start',
    }}
  >
    {item.role === 'ai' && (
      <Text
        style={{
          fontSize: 24,
          marginRight: 8,
        }}
      >
        🪐
      </Text>
    )}

    <View
      style={{
        backgroundColor:
          item.role === 'user'
            ? '#2563eb'
            : '#1e293b',

        padding: 15,
        borderRadius: 18,

        maxWidth: '80%',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          lineHeight: 22,
        }}
      >
        {item.text}
      </Text>
    </View>

    {item.role === 'user' && (
      <Text
        style={{
          fontSize: 24,
          marginLeft: 8,
        }}
      >
        🙂
      </Text>
    )}
  </View>
);
  
    
}