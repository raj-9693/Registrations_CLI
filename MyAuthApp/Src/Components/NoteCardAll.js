import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Category ke hisaab se Icon, Icon-Background aur Badge Colors
const CATEGORY_CONFIG = {
   officesworks: { icon: '💼', bg: '#FFF0EA', badgeBg: '#FFF0EA', color: '#C2410C' },
    Homeworks: { icon: '🎓', bg: '#EAF3FF', badgeBg: '#EAF3FF', color: '#174EA6' },
   personal: { icon: '❤️', bg: '#F3EAFE', badgeBg: '#EEF2F7', color: '#1E3A5F' },
  importent: { icon: '⭐', bg: '#EAF8F0', badgeBg: '#EAF8F0', color: '#18794E' },
};

const DEFAULT_CONFIG = { icon: '📝', bg: '#F1F2F4', badgeBg: '#F1F2F4', color: '#5F6368' };

// "Updated today" / "Updated yesterday" / "Updated Mon, Apr 12" jaisa Label
const getUpdatedLabel = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Updated today';
  if (date.toDateString() === yesterday.toDateString()) return 'Updated yesterday';

  return `Updated ${date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })}`;
};

/**
 * NoteCard Component
 *
 * Props:
 * - note: Poora Note Object (title, category_id, todos, updatedAt/createdAt)
 * - onPress: Card dabane par (Edit/View karne ke liye)
 * - onMenuPress: "..." Menu dabane par (Optional -- Delete/Edit options ke liye)
 */
const NoteCardAll = ({ note, onPress, onMenuPress }) => {
  const categoryName = note?.category_id?.category_name || note?.category || 'General';
  const config = CATEGORY_CONFIG[categoryName] || DEFAULT_CONFIG;

  const todos = note?.todos || [];
  const total = todos.length;
  const completed = todos.filter((t) => t.is_completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={[styles.iconCircle, { backgroundColor: config.bg }]}>
          <Text style={styles.iconText}>{config.icon}</Text>
        </View>

        
      </View>

      

      <Text style={styles.title} numberOfLines={1}>
        {note?.title}
      </Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {getUpdatedLabel(note?.updatedAt || note?.createdAt)}
        </Text>
        <Text style={[styles.taskCount, { color: config.color }]}>
          {completed} of {total} tasks
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${percent}%`, backgroundColor: config.color },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NoteCardAll;

const styles = StyleSheet.create({
  card: {
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  menuDots: {
    fontSize: 16,
    color: '#9AA5B1',
    letterSpacing: 1,
    paddingTop: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginTop: 8,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12.5,
    color: '#9AA5B1',
  },
  taskCount: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#EEF0F3',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});