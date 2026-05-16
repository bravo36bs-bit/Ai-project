import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

export default function MessageInput({
  message,
  setMessage,
  sendMessage,
  loading,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,

        paddingBottom:
          Platform.OS === 'ios'
            ? 25
            : 15,

        backgroundColor: '#0f172a',
      }}
    >
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="اكتب رسالة..."
        placeholderTextColor="#94a3b8"
        multiline
        style={{
          flex: 1,
          backgroundColor: '#1e293b',
          color: 'white',
          borderRadius: 18,
          paddingHorizontal: 15,
          paddingVertical: 12,
          maxHeight: 120,
          fontSize: 16,
        }}
      />

      <TouchableOpacity
        onPress={sendMessage}
        disabled={loading}
        style={{
          backgroundColor: loading
            ? '#475569'
            : '#2563eb',

          marginLeft: 10,
          width: 60,
          height: 60,
          borderRadius: 18,

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
  );
}