import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { Notesdeta } from '../../../Api/NotsClients';
import SearchBar from '../../../Components/SearchBar';
import NoteCard from '../../../Components/NoteCardAll';
import SettingIcon from '../../../Assets/Image/setting-icon.svg';

const CATEGORIES = ['All', 'HomeWorks', 'OfficeWorks', 'Personal', 'Important'];

const categoryChipStyles = {
  HomeWorks: { backgroundColor: '#EAF3FF', color: '#174EA6' },
  OfficeWorks: { backgroundColor: '#FFF0EA', color: '#C2410C' },
  Personal: { backgroundColor: '#EEF2F7', color: '#1E3A5F' },
  Important: { backgroundColor: '#EAF8F0', color: '#18794E' },
};

const getDateLabel = (date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (date.toDateString() === today.toDateString()) {
    return `Today · ${formattedDate}`;
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday · ${formattedDate}`;
  }

  return formattedDate;
};

const normalizeCategoryName = (value) => String(value || '').trim();

const groupNotesByDate = (notes) => {
  const groups = {};

  notes.forEach((note) => {
    const dateValue = note.updatedAt || note.createdAt || new Date().toISOString();
    const dateObj = new Date(dateValue);

    if (Number.isNaN(dateObj.getTime())) return;

    const dateKey = dateObj.toDateString();

    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(note);
  });

  const sortedKeys = Object.keys(groups).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return sortedKeys.map((key) => ({
    title: getDateLabel(new Date(key)),
    data: groups[key],
  }));
};

const AllNotsScreen = ({ navigation }) => {
  const [MyNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        try {
          const response = await Notesdeta();
          setMyNotes(response.data?.NotesDeta || response.NotesDeta || []);
        } catch (error) {
          console.log('message', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotes();
    }, [])
  );

  // Har Category me kitne Notes hain, Pill ke Number ke liye
  const getCategoryCount = (cat) => {
    if (cat === 'All') return MyNotes.length;

    const targetCategory = normalizeCategoryName(cat).toLowerCase();

    return MyNotes.filter((n) => {
      const noteCategory = normalizeCategoryName(
        n.category_id?.category_name || n.category
      ).toLowerCase();
      return noteCategory === targetCategory;
    }).length;
  };

  // Category + Search dono Filters ek saath lagana
  const filteredNotes = useMemo(() => {
    let result = MyNotes;

    if (selectedCategory !== 'All') {
      const targetCategory = normalizeCategoryName(selectedCategory).toLowerCase();
      result = result.filter((n) => {
        const noteCategory = normalizeCategoryName(
          n.category_id?.category_name || n.category
        ).toLowerCase();
        return noteCategory === targetCategory;
      });
    }

    if (searchQuery.trim()) {
      result = result.filter((n) =>
        n.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [MyNotes, selectedCategory, searchQuery]);

  const sections = useMemo(() => groupNotesByDate(filteredNotes), [filteredNotes]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerSubtitle}>Your workspace</Text>
          <Text style={styles.headerTitle}>All notes</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={()=>
          navigation.navigate('Setting')
        }>
          <SettingIcon width={18} height={18} fill="#1A1D20" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search your notes"
        />
      </View>

      {/* Category Pills with Counts */}
      <ScrollView
        horizontal
        style={styles.categoryScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const customStyle = categoryChipStyles[cat];

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.chip,
                isSelected
                  ? styles.chipSelected
                  : { backgroundColor: customStyle?.backgroundColor || '#FFFFFF' },
                !isSelected && styles.chipUnselected,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected
                    ? styles.chipTextSelected
                    : { color: customStyle?.color || '#5F6368' },
                ]}
              >
                {cat} {getCategoryCount(cat)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Date-Grouped Notes List */}
      <SectionList
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item, index) => item._id || String(index)}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title, data } }) => (
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            <View style={styles.sectionHeaderDivider} />
            <Text style={styles.sectionCountText}>
              {data.length} {data.length === 1 ? 'note' : 'notes'}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate('Note', {user: item })}
          />
        )}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>No notes found.</Text>
          )
        }
      />

    </SafeAreaView>
  );
};

export default AllNotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 14,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9AA5B1',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginTop: 2,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  categoryScroll: {
    flexGrow: 0,
  },

  pillRow: {
    
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
    alignItems: 'flex-start',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: '#1A73E8',
  },
  chipUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADCE0',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1D20',
  },
  sectionHeaderDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DADCE0',
    marginHorizontal: 10,
  },
  sectionCountText: {
    fontSize: 12.5,
    color: '#9AA5B1',
  },

  emptyText: {
    textAlign: 'center',
    color: '#9AA5B1',
    marginTop: 40,
    fontSize: 14,
  },
});