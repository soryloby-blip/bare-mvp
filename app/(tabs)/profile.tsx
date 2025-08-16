import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Camera, CreditCard as Edit3, LogOut, Save } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    age: profile?.age?.toString() || '',
    bio: profile?.bio || '',
    interests: profile?.interests?.join(', ') || '',
    relationship_type: profile?.relationship_type || '',
  });

  const handleSave = async () => {
    const interests = formData.interests
      .split(',')
      .map(interest => interest.trim())
      .filter(interest => interest.length > 0);

    const { error } = await updateProfile({
      name: formData.name,
      age: parseInt(formData.age),
      bio: formData.bio,
      interests,
      relationship_type: formData.relationship_type,
    });

    if (error) {
      Alert.alert('Error', 'Failed to update profile');
    } else {
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      // In a real app, you would upload this to Supabase Storage
      console.log('Image selected:', result.assets[0].uri);
      Alert.alert('Photo Selected', 'In a real app, this would upload to your profile');
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <Save size={24} color="#FF6B6B" />
          ) : (
            <Edit3 size={24} color="#FF6B6B" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer} onPress={handleImagePick}>
            <Image
              source={{
                uri: profile?.photo_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
              }}
              style={styles.photo}
            />
            <View style={styles.photoOverlay}>
              <Camera size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              editable={isEditing}
              placeholder="Your name"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              editable={isEditing}
              placeholder="Your age"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.textArea, !isEditing && styles.inputDisabled]}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              editable={isEditing}
              placeholder="Tell others about yourself..."
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Interests</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.interests}
              onChangeText={(text) => setFormData({ ...formData, interests: text })}
              editable={isEditing}
              placeholder="Travel, Coffee, Hiking (comma separated)"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Looking For</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.relationship_type}
              onChangeText={(text) => setFormData({ ...formData, relationship_type: text })}
              editable={isEditing}
              placeholder="Serious, Casual, Friends, etc."
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#DC3545" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    backgroundColor: '#F8F9FA',
    color: '#6C757D',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#DC3545',
  },
  signOutText: {
    color: '#DC3545',
    fontSize: 16,
    fontWeight: '600',
  },
});