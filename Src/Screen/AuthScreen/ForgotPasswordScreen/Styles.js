import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f6',
  },
  Content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'space-between',
    flex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 26,
  },
  logoIcon: {
    width: 18,
    height: 18,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 14,
  },
  subTitleText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  BacktosignText: {
    fontSize: 18,
    color: '#3B82F6',
    fontWeight: '700',
  },
  BacktosignDesion: {
    alignItems: 'center',
    marginBottom: 1,
  },
});
