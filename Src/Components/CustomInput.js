import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Label (ऊपर वाला टाइटल जैसे "Email") */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* 2. Text Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
 
     width:'100%',
    marginBottom: 16, // दो इनपुट बॉक्सेस के बीच का वर्टिकल गैप
   
  },
  label: {
    fontSize: 12,
    color: '#6B7280', // Figma वाला हल्का ग्रे कलर
    marginBottom: 8,  // लेबल और इनपुट के बीच का गैप
    fontWeight: '400',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF', // सफ़ेद बैकग्राउंड
    borderWidth: 1,
    borderColor: '#E5E7EB',     // Figma का लाइट ग्रे बॉर्डर
    borderRadius: 12,           // राउंडेड कॉर्नर्स
    height: 52,                 // इनपुट बॉक्स की परफेक्ट हाइट
    paddingHorizontal: 16,      // अंदर से लेफ्ट-राइट पैडिंग
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    color: '#1F2937',          // टाइप होने वाले टेक्स्ट का डार्क कलर
    padding: 0,                // Android के डिफ़ॉल्ट पैडिंग इश्यू को फिक्स करने के लिए
  },
});