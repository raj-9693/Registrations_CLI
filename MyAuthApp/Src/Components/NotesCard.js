import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const categoryBadgeColors = {
  homeworks: { backgroundColor: '#EAF3FF', color: '#174EA6' },
  officesworks: { backgroundColor: '#FFF0EA', color: '#C2410C' },
  personal: { backgroundColor: '#EEF2F7', color: '#1E3A5F' },
  importent: { backgroundColor: '#EAF8F0', color: '#18794E' },
};

const NotesCard = ({ title, description, category, todos = [], onPress }) => {
  const completedCount = todos.filter((item) => item.is_completed).length;
  const totalCount = todos.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categoryKey = String(category || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');
  const badgeColors = categoryBadgeColors[categoryKey] || {
    backgroundColor: '#E8F0FE',
    color: '#1A73E8',
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>

      {/* Top row: Category badge only (no 3-dot menu) */}
      <View style={styles.topRow}>
        {category && (
          <View style={[styles.categoryBadge, { backgroundColor: badgeColors.backgroundColor }]}>
            <Text style={[styles.categoryText, { color: badgeColors.color }]}>{category}</Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={1}>
        {description}
      </Text>

      {/* Progress bar with percentage */}
      {totalCount > 0 && (
        <View style={styles.progressRow}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressPercentText}>{progressPercent}%</Text>
        </View>
      )}

      {/* Bottom row: tasks complete + Open note link */}
      <View style={styles.bottomRow}>
        <View style={styles.bottomLeft}>
          <View style={styles.clockDot} />
          <Text style={styles.progressText}>
            {completedCount} of {totalCount} tasks complete
          </Text>
        </View>
        <Text style={styles.openNoteText}>Open note</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  progressPercentText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2563EB',
    minWidth: 32,
    textAlign: 'right',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  progressText: {
    fontSize: 12.5,
    color: '#6B7280',
  },
  openNoteText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1A73E8',
  },
});

export default NotesCard;