import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NotsDelete } from '../../../Api/NotsClients';
import { SafeAreaView } from 'react-native-safe-area-context';
import AngleLeftIcon from '../../../Assets/Image/angle-left-icon.svg';
import PencilIcon from '../../../Assets/Image/pencil-icon.svg';
import SettingIcon from '../../../Assets/Image/setting-icon.svg';
import apiClint from '../../../Api/apiClint';

const categoryBadgeColors = {
  Homeworks: { backgroundColor: '#EAF3FF', color: '#174EA6' },
  officesworks: { backgroundColor: '#FFF0EA', color: '#C2410C' },
  personal: { backgroundColor: '#EEF2F7', color: '#1E3A5F' },
  importent: { backgroundColor: '#EAF8F0', color: '#18794E' },
};

const NoteScreen = ({ route, navigation }) => {
  const { user } = route.params || {};

  
  console.log('MyNots user',user)
  

   const notsId = user._id ;
  const categoryName = typeof user?.category_id === 'string'
    ? user.category_id
    : user?.category_id?.category_name;
  const categoryKey = String(categoryName || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');
  const badgeColors = categoryBadgeColors[categoryKey] || {
    backgroundColor: '#E8F0FE',
    color: '#1A73E8',
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user && user.todos) {
      setTodos(user.todos);
    } else {
      setTodos([]);
    }
  }, [user]);

  const toggleTodo = async (index) => {
    const previousTodos = todos;
    const todo = previousTodos[index];
    const updatedTodo = {
      ...todo,
      is_completed: !todo.is_completed,
    };
    const updatedTodos = previousTodos.map((item, todoIndex) =>
      todoIndex === index ? updatedTodo : item
    );
    setTodos(updatedTodos);

    try {
      await apiClint.put(`/api/notes/${notsId}/todos/${todo._id}`, {
        is_completed: updatedTodo.is_completed,
      });
    } catch (err) {
      console.log('Todo update failed:', err.response?.data || err.message);
      setTodos(previousTodos);
    }
  };

  const completedCount = todos.filter((t) => t.is_completed).length;
  const totalCount = todos.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleDelete = () => {
    setTimeout(() => {
      Alert.alert(
        'Delete Note',
        'Kya aap sure hain ki aap is note ko delete karna chahte hain?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const response = await NotsDelete(notsId);
                console.log('delete deta', response.data?.message);
                navigation.goBack();
              } catch (err) {
                console.log('delete deta eror', err.response?.data?.message);
              }
            },
          },
        ]
      );
    }, 100);
  };


  const handleUpdate = () => {
    navigation.navigate('Main', {
      screen: 'NoteAdd',
      params: { userNots: user },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <AngleLeftIcon width={8} height={16} fill="#1A1D20" />
        </TouchableOpacity>

        <View style={styles.topHeaderRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={()=>navigation.navigate('Setting')}>
            <SettingIcon width={18} height={18} fill="#1A1D20" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handleUpdate}>
            <PencilIcon width={18} height={18} fill="#1A1D20" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Category Badge */}
        {categoryName && (
          <View style={[styles.badge, { backgroundColor: badgeColors.backgroundColor }]}>
            <Text style={[styles.badgeText, { color: badgeColors.color }]}>{categoryName}</Text>
          </View>
        )}

        {/* Title */}
        <Text style={styles.title}>{user?.title || 'No Title'}</Text>

        {/* Description */}
        <Text style={styles.description}>
          {user?.description || 'No Description available.'}
        </Text>

        {/* Progress Card — UNCHANGED */}
        {totalCount > 0 && (
          <View style={styles.progressCard}>
            <View style={styles.progressCardContent}>
              <View>
                <Text style={styles.progressLabel}>PROGRESS</Text>
                <Text style={styles.progressTitle}>Tasks</Text>
              </View>
              <View style={styles.progressBadge}>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
                <Text style={styles.progressCountText}>
                  {completedCount} of {totalCount} done
                </Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
          </View>
        )}

        {/* Tasks Section Header */}
        <View style={styles.tasksHeaderRow}>
          <View>
            <Text style={styles.tasksHeading}>Tasks</Text>
            <Text style={styles.tasksSubheading}>Keep the momentum going</Text>
          </View>
          <TouchableOpacity onPress={ handleUpdate}>
            <Text style={styles.addTaskText}>+ Add task</Text>
          </TouchableOpacity>
        </View>

        {/* Todos List */}
        <View style={styles.todoListContainer}>
          {todos.map((todo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.todoRow}
              onPress={() => toggleTodo(index)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkboxCircle,
                  todo.is_completed && styles.checkboxCircleCompleted,
                ]}
              >
                {todo.is_completed && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text
                style={[
                  styles.todoText,
                  todo.is_completed && styles.completedTodoText,
                ]}
              >
                {todo.task_text}
              </Text>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.btn, styles.updateBtn]}
          onPress={handleUpdate}
        >
          <Text style={styles.updateBtnText}>Update note</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.deleteBtn]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteBtnText}> Delete</Text>
        </TouchableOpacity>
      </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  // Top header
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
   paddingVertical:22
  },
  topHeaderRight: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 4,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  badgeText: {
    color: '#3B72E7',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginBottom: 10,
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    color: '#6C757D',
    lineHeight: 22,
    marginBottom: 20,
  },

  // Progress card — UNCHANGED FROM ORIGINAL
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F3',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  progressCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9AA5B1',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1D20',
  },
  progressBadge: {
    backgroundColor: '#E8F0FE',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D20',
  },
  progressCountText: {
    fontSize: 11,
    color: '#5F6368',
    marginTop: 2,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E8EEF7',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2474E8',
    borderRadius: 3,
  },
  // END progress card

  // Tasks header row
  tasksHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tasksHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginBottom: 2,
  },
  tasksSubheading: {
    fontSize: 13,
    color: '#9AA5B1',
  },
  addTaskText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2474E8',
    marginTop: 4,
  },

  // Todo list
  todoListContainer: {
    gap: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  checkboxCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#2474E8',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCircleCompleted: {
    backgroundColor: '#2474E8',
    borderColor: '#2474E8',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
    fontWeight: '400',
  },
  chevron: {
    fontSize: 20,
    color: '#B0B7C0',
    marginLeft: 8,
  },

  // Action buttons
  actionContainer: {
    flexDirection: 'row',
    paddingVertical:22,
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtn: {
    backgroundColor: '#0066FF',
  },
  deleteBtn: {
    backgroundColor: '#FDECEC',
  },
  updateBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteBtnText: {
    color: '#DC3545',
    fontSize: 16,
    fontWeight: '600',
  },
});