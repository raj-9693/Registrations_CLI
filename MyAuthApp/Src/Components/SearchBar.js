import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../Assets/Image/search-icon.svg';

const SearchBar = ({ value, onChangeText, placeholder = 'Search notes...' }) => {
  return (
    <View style={styles.container}>
      <SearchIcon width={18} height={18} style={styles.icon} />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#757575"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14, // Full rounded / Pill design
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light grey border line
    paddingHorizontal: 16,
    paddingVertical: 6,
    height: 48,
    
    marginVertical: 4,
    
    // Optional light shadow (agar Android/iOS me thoda elevate karna ho)
   
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    paddingVertical: 0, // Android vertical alignment fix
  },
});

export default SearchBar;