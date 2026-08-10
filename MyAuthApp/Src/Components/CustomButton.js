import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  isLoading = false, // 👈 लोडिंग स्टेट
  disabled = false,
  bgColor = '#3B82F6', // Figma वाला ब्लू कलर
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor },
        (isLoading || disabled) && styles.disabledButton, // लोडिंग के वक्त बटन थोड़ा डिम दिखेगा
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading || disabled} // लोडिंग के समय बटन पर बार-बार क्लिक नहीं होगा
    >
      <View style={styles.contentContainer}>
        {/* बटन का टाइटल */}
        <Text style={[styles.buttonText, { color: textColor }]}>
          {title}
        </Text>

        {/* 👈 जब isLoading true होगा, तो 'Log In' के ठीक बगल में यह लोडर दिखेगा */}
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={styles.loader}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    // flex:1,
    height: 52, // Figma की स्टैंडर्ड बटन हाइट
    borderRadius: 12, // Figma राउंडेड बॉर्डर
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    // बटन की हल्की सी शैडो (Shadow)
    elevation: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.7, // लोडिंग या डिसेबल होने पर बटन का रंग थोड़ा हल्का हो जाएगा
  },
  contentContainer: {
    flexDirection: 'row', // टेक्स्ट और लोडर को एक लाइन में रखने के लिए
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginLeft: 10, // 'Log In' टेक्स्ट और लोडर के बीच का गैप
  },
});