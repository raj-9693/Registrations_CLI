import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  Content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flex: 1,
  },
  logoIcon: {
    width: 18,
    height: 18,
    marginBottom: 26,
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
  CustomInputBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
  },
});
