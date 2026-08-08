import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

const SocialButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.6} // 👈 इससे क्लिक करने पर बटन थोड़ा फेड होगा जिससे लगेगा कि क्लिक हुआ है
    >
      <View style={styles.container}>
        {/* Social Icon (Google / Facebook) */}
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        
        {/* Button Title */}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  button: {
    flex: 1, // 👈 रो (Row) में बराबर जगह (50-50%) घेरने के लिए
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6', // Figma वाला लाइट बॉर्डर
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // हल्की सी शैडो ताकि बटन उठा हुआ लगे
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8, // आइकन और टेक्स्ट के बीच गैप
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
});