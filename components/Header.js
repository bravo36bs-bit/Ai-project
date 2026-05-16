import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function Header({
  clearChat,
}) {
  return (
    <View
      style={{
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,

        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',

        backgroundColor: '#0f172a',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          🪐 Nova
        </Text>

        <Text
          style={{
            color: '#94a3b8',
            marginTop: 5,
            fontSize: 15,
          }}
        >
          Online
        </Text>
      </View>

      <TouchableOpacity
        onPress={clearChat}
        style={{
          backgroundColor: '#dc2626',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Clear
        </Text>
      </TouchableOpacity>
    </View>
  );
}