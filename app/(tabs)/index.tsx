import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { ProfileCard } from '@/components/ProfileCard';
import { Profile } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

// Mock data for demonstration
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone to explore the city with!',
    photo_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    interests: ['Travel', 'Coffee', 'Hiking'],
    relationship_type: 'serious',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '2',
    name: 'Alex',
    age: 32,
    bio: 'Software engineer by day, chef by night. Always up for trying new restaurants or cooking together.',
    photo_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    interests: ['Cooking', 'Tech', 'Food'],
    relationship_type: 'casual',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '3',
    name: 'Maya',
    age: 26,
    bio: 'Yoga instructor and mindfulness coach. Seeking genuine connections and meaningful conversations.',
    photo_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    interests: ['Yoga', 'Meditation', 'Wellness'],
    relationship_type: 'serious',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

export default function DiscoverScreen() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealRequests, setRevealRequests] = useState<Set<string>>(new Set());

  const currentProfile = profiles[currentIndex];

  const handleLike = () => {
    Alert.alert('Match!', `You liked ${currentProfile.name}`);
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const handleRequestReveal = () => {
    if (!user) return;
    
    setRevealRequests(prev => new Set(prev).add(currentProfile.id));
    Alert.alert('Request Sent', `Photo reveal request sent to ${currentProfile.name}`);
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('No More Profiles', 'Check back later for more matches!');
    }
  };

  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No More Profiles</Text>
          <Text style={styles.emptySubtitle}>Check back later for more potential matches!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Find your authentic connection</Text>
      </View>

      <View style={styles.cardContainer}>
        <ProfileCard
          profile={currentProfile}
          isBlurred={true}
          onLike={handleLike}
          onPass={handlePass}
          onRequestReveal={handleRequestReveal}
          hasRevealRequest={revealRequests.has(currentProfile.id)}
        />
      </View>
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
    paddingBottom: 10,
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
});