import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Eye, Heart, X } from 'lucide-react-native';
import { Profile } from '@/lib/supabase';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

interface ProfileCardProps {
  profile: Profile;
  isBlurred: boolean;
  onLike: () => void;
  onPass: () => void;
  onRequestReveal: () => void;
  hasRevealRequest?: boolean;
}

export function ProfileCard({
  profile,
  isBlurred,
  onLike,
  onPass,
  onRequestReveal,
  hasRevealRequest = false,
}: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: profile.photo_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
          style={styles.image}
        />
        {isBlurred && (
          <BlurView intensity={80} style={styles.blur}>
            <TouchableOpacity
              style={styles.revealButton}
              onPress={onRequestReveal}
              disabled={hasRevealRequest}
            >
              <Eye size={24} color="#FFFFFF" />
              <Text style={styles.revealButtonText}>
                {hasRevealRequest ? 'Request Sent' : 'Request Reveal'}
              </Text>
            </TouchableOpacity>
          </BlurView>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.age}>{profile.age}</Text>
        </View>
        
        <Text style={styles.bio}>{profile.bio}</Text>
        
        {profile.interests && profile.interests.length > 0 && (
          <View style={styles.interests}>
            {profile.interests.slice(0, 3).map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.passButton} onPress={onPass}>
          <X size={28} color="#6C757D" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
          <Heart size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revealButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revealButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  age: {
    fontSize: 20,
    color: '#6C757D',
  },
  bio: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 22,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 14,
    color: '#495057',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  passButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});