import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * ErrorText Component
 *
 * Formik ke error/touched fields ke liye reusable error message.
 *
 * Props:
 * - error: errors.fieldName (Formik se)
 * - touched: touched.fieldName (Formik se)
 */
const ErrorText = ({ error, touched }) => {
  // Agar error nahi hai ya field abhi touch nahi hua, kuch bhi render mat karo
  if (!error || !touched) return null;

  return <Text style={styles.errorText}>{error}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 6,
    paddingHorizontal:10,
  },
});