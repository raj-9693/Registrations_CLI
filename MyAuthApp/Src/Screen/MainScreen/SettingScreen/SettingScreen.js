import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';

// Agar icons chahiye to react-native-vector-icons ya @expo/vector-icons install karo
// import Icon from 'react-native-vector-icons/Feather';

const SettingScreen = ({ user = { name: 'Mia Chen', email: 'mia.chen@icloud.com' } }) => {
  const [icloudBackup, setIcloudBackup] = React.useState(true);
const {userDeta} = useContext(AuthContext)
  // Naam ka pehla letter nikalna
  const getInitial = (name) => {
    if (!name) return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>Profile & settings</Text>

        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            {/* Yaha photo ki jagah initial letter avatar */}
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{getInitial(userDeta?.firstName || 'N')}</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userDeta?.firstName || 'Raj '}</Text>
              <Text style={styles.profileEmail}>{userDeta?.email || '.com'}</Text>
            </View>
            
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
              <Text style={styles.iconEmoji}>🔔</Text>
            </View>
            <Text style={styles.rowLabel}>Reminders & notifications</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.iconEmoji}>🌙</Text>
            </View>
            <Text style={styles.rowLabel}>Appearance</Text>
            <Text style={styles.rowValue}>Light</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: '#FFE4E1' }]}>
              <Text style={styles.iconEmoji}>🏷️</Text>
            </View>
            <Text style={styles.rowLabel}>Manage categories</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Your Data Section */}
        <Text style={styles.sectionTitle}>Your data</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
              <Text style={styles.iconEmoji}>⬇️</Text>
            </View>
            <Text style={styles.rowLabel}>Export my notes</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
              <Text style={styles.iconEmoji}>☁️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>iCloud backup</Text>
              <Text style={styles.rowSubLabel}>Last backed up today</Text>
            </View>
            <Switch
              value={icloudBackup}
              onValueChange={setIcloudBackup}
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutIcon}>⇥</Text>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    color: '#3B82F6',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 58,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 16,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  rowSubLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  rowValue: {
    fontSize: 14,
    color: '#F97316',
    marginRight: 6,
  },
  chevron: {
    fontSize: 18,
    color: '#CBD5E1',
    marginLeft: 4,
  },
  signOutButton: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  signOutIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingScreen;