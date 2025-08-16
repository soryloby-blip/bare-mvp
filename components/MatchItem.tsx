import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Profile, Match } from '@/lib/supabase';

interface MatchItemProps {
  match: Match;
  otherProfile: Profile;
  lastMessage?: string;
  onPress: () => void;
}

export function MatchItem({ match, otherProfile, lastMessage, onPress }: MatchItemProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: otherProfile.photo_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
        style={styles.avatar}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{otherProfile.name}</Text>
          {match.last_message_at && (
            <Text style={styles.time}>
              {formatTime(match.last_message_at)}
            </Text>
          )}
        </View>
        
        <Text style={styles.lastMessage} numberOfLines={1}>
          {lastMessage || 'Start the conversation...'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  time: {
    fontSize: 14,
    color: '#6C757D',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6C757D',
  },
});