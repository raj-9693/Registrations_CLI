import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const OTPInput = ({ length = 6, label = 'Verification Code', onCodeFilled }) => {
  const [code, setCode] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    // sirf ek digit allow karna
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // agar user ne digit dala, to agle box par focus le jao
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // agar sab boxes bhar gaye, to parent ko poora code bhej do
    if (newCode.every((digit) => digit !== '')) {
      onCodeFilled && onCodeFilled(newCode.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    // Backspace dabane par, agar current box khali hai to pichle box par jao
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.boxRow}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              styles.box,
              digit ? styles.boxFilled : null,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectionColor="#2F6BFF"
          />
        ))}
      </View>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom:20,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 10,
    fontWeight: '500',
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 48,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    color: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
    // shadow (thoda card-jaisa look)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  boxFilled: {
    borderBottomColor: '#2F6BFF',
  },
});