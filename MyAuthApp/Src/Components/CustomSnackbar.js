import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * CustomSnackbar Component
 *
 * Props:
 * - visible: Boolean to show/hide the snackbar
 * - message: The text to display
 * - type: 'success' (green) or 'error' (red)
 * - onDismiss: Function to call when the snackbar should close
 * - duration: How long to show the snackbar before auto-dismissing (default 3000ms)
 */
const CustomSnackbar = ({
  visible,
  message,
  type = 'success',
  onDismiss,
  trigger,
  duration = 3000,
  bottomOffset = 40,
}) => {
  const hiddenPosition = bottomOffset + 150;
  const translateY = useRef(new Animated.Value(hiddenPosition)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: hiddenPosition,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, trigger, bottomOffset, duration]);

  const handleDismiss = () => {
    if (onDismiss) onDismiss();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomOffset,
          opacity,
          backgroundColor: type === 'success' ? '#2e7d32' : '#d32f2f',
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  closeIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CustomSnackbar;
