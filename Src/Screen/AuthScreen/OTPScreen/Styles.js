import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  Content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 24,
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
  subTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitleText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  signUpLink: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  ResendLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
  ResendText: {
    alignItems: 'center',
  },
});
