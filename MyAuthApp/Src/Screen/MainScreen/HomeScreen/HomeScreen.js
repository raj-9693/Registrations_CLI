import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../../Context/AuthContext';
import { Notesdeta } from '../../../Api/NotsClients';
import SearchBar from '../../../Components/SearchBar';
import NotesCard from '../../../Components/NotesCard';

// User ke First + Last Name se Initials nikalna, Safe tareeke se
const getInitials = (first, last) => {
  const f = first ? first.trim()[0] : '';
  const l = last ? last.trim()[0] : '';
  const initials = (f + l).toUpperCase();
  return initials || 'U';
};

// Time ke hisaab se Greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const HomeScreen = ({ navigation }) => {
  const { logout, userDeta } = useContext(AuthContext);

  const [MyNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const initials = getInitials(userDeta?.firstName, userDeta?.lastName);
  const greeting = getGreeting();
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // API Call -- Screen par Focus aane par Notes fetch/refresh honge
  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        setLoading(true);
        try {
          const response = await Notesdeta();
       const result=  response.data?.data || [];

          console.log('Problem he kay ', result)
          setMyNotes(result);
        } catch (error) {
          console.log('message', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotes();
    }, [])
  );

  // Search Text se Notes ko Filter karna (Title me match karke)
  const filteredNotes = MyNotes.filter((note) =>
    note.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Har Note ke Todos se Progress nikalna
  const getProgress = (todos = []) => {
    const total = todos.length;
    const completed = todos.filter((t) => t.is_completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  };

  // Overview Stats -- Left-Round Right-Round Pills ke liye
  const totalNotes = MyNotes.length;
  const completedNotes = MyNotes.filter((n) => {
    const { total, completed } = getProgress(n.todos);
    return total > 0 && completed === total;
  }).length;
  const pendingNotes = totalNotes - completedNotes;

  const stats = [
    { label: 'Total notes', value: totalNotes, bg: '#EAF2FF', color: '#1A73E8' },
    { label: 'Completed', value: completedNotes, bg: '#E8F8EE', color: '#1DBF73' },
    { label: 'Pending', value: pendingNotes, bg: '#FFF4E5', color: '#F59E0B' },
  ];

  // FlatList ke Header me sab kuch (Greeting, Search, Stats, Section Title)
  const ListHeader = () => (
    <View>
      {/* Header: Date + Greeting + Initials Avatar + Logout */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.dateText}>{todayLabel}</Text>
            <Text style={styles.greetingText}>
              {greeting}, {userDeta?.firstName || 'there'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholder="Search notes..."
      />

      {/* Left-Round Right-Round Stat Pills (Horizontal Scroll) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statPill, { backgroundColor: stat.bg }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: stat.color }]}>{stat.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Your Notes Section Title */}
      <View style={styles.sectionHeaderRow}>
        <View>
          <Text style={styles.sectionTitle}>Your notes</Text>
          <Text style={styles.sectionSubtitle}>
            {pendingNotes} {pendingNotes === 1 ? 'note needs' : 'notes need'} your attention
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={filteredNotes}
        keyExtractor={(item, index) => item._id || String(index)}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>No notes found. Tap + to create one.</Text>
          )
        }
        renderItem={({ item }) => (
          <NotesCard
            title={item.title}
            description={item.description}
            category={item.category_id?.category_name}
            todos={item.todos}
            onPress={() => navigation.navigate('Note', { user: item })}
          />
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteAdd')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingtop:10,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A73E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dateText: {
    fontSize: 12,
    color: '#9AA5B1',
    fontWeight: '600',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginTop: 2,
  },
  logoutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFDEDE',
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: '600',
    fontSize: 12,
  },

  // Stat Pills
  pillRow: {
    paddingVertical: 14,
    gap: 6,
  },
  statPill: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },

  // Section Header
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1D20',
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: '#9AA5B1',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A73E8',
  },

  // Note Card
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginBottom: 4,
  },
  noteDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#EEF0F3',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1A73E8',
    borderRadius: 3,
  },
  noteFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCountText: {
    fontSize: 12.5,
    color: '#6B7280',
  },
  openNoteText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A73E8',
  },

  emptyText: {
    textAlign: 'center',
    color: '#9AA5B1',
    marginTop: 110,
    fontSize: 16,
  },

  // Floating Add Button
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 15,
    backgroundColor: '#1A73E8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -2,
  },
});