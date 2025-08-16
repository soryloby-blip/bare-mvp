import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MatchItem } from '@/components/MatchItem';
import { Profile, Match } from '@/lib/supabase';
import { useRouter } from 'expo-router';

// Mock data for demonstration
const mockMatches: Array<{
  match: Match;
  profile: Profile;
  lastMessage: string;
}> = [
  {
    match: {
      id: '1',
      user1_id: 'current_user',
      user2_id: '1',
      created_at: '2024-01-15T10:00:00Z',
      last_message_at: '2024-01-15T14:30:00Z',
    },
    profile: {
      id: '1',
      name: 'Sarah',
      age: 28,
      bio: 'Adventure seeker, coffee lover',
      photo_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
    lastMessage: 'Thanks for accepting my reveal request! 😊',
  },
  {
    match: {
      id: '2',
      user1_id: 'current_user',
      user2_id: '2',
      created_at: '2024-01-14T16:00:00Z',
      last_message_at: '2024-01-14T18:15:00Z',
    },
    profile: {
      id: '2',
      name: 'Alex',
      age: 32,
      bio: 'Software engineer by day, chef by night',
      photo_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
    lastMessage: 'Would love to cook together sometime!',
  },
];

export default function MessagesScreen() {
  const [matches] = useState(mockMatches);
  const router = useRouter();

  const handleMatchPress = (matchId: string, profileName: string) => {
    // Navigate to chat screen (would be implemented)
    console.log(`Navigate to chat with ${profileName}`);
  };

  const renderMatch = ({ item }: { item: typeof mockMatches[0] }) => (
    <MatchItem
      match={item.match}
      otherProfile={item.profile}
      lastMessage={item.lastMessage}
      onPress={() => handleMatchPress(item.match.id, item.profile.name)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>{matches.length} matches</Text>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start swiping to find your matches and begin conversations!
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.match.id}
          renderItem={renderMatch}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 22,
  },
});