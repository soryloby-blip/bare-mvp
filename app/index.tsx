import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';

export default function IndexScreen() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (!loading && !showSplash && user) {
      // User is authenticated, redirect to tabs
    }
  }, [loading, showSplash, user]);

  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#F8F9FA' }} />;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <AuthForm
      mode={authMode}
      onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
      onSuccess={() => {
        // Auth successful, will redirect via useEffect
      }}
    />
  );
}