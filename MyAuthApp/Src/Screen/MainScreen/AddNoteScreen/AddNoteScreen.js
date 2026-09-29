import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import{getCategory} from '../../../Api/CategoryClint'

import { AuthContext } from '../../../Context/AuthContext';
import { Notespost, notsUpdates } from '../../../Api/NotsClients';
import { setNestedObjectValues } from 'formik';
import AngleLeftIcon from '../../../Assets/Image/angle-left-icon.svg';

const CATEGORY_OPTIONS = ['HomeWorks', 'OfficeWorks', 'Personal', 'Important'];

const AddNoteScreen = ({ navigation, route }) => {
  const { userDeta } = useContext(AuthContext);
  const UserID = userDeta.id;

  const { userNots } = route.params || {};

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await getCategory();

        const categoryList = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];

        setCategories(categoryList);

        if (categoryList.length > 0) {
          setSelectedCategoryId(categoryList[0]._id);
        }
      } catch (err) {
        console.log("Category Fetch Error:", err);
      }
    };

    fetchcategory();
  }, []);


  useEffect(() => {
    if (userNots?._id) {
      setTitle(userNots.title || '');
      setDescription(userNots.description || '');
      setTodos(Array.isArray(userNots.todos) ? userNots.todos : []);
      setSelectedCategoryId(userNots.category_id || userNots.category || '');
    } else {
      setTitle('');
      setDescription('');
      setTodoInput('');
      setTodos([]);
      setSelectedCategoryId('');
    }
  }, [userNots]);

  const handleAddTodo = () => {
    if (todoInput.trim() === '') return;
    setTodos([...todos, { task_text: todoInput.trim(), is_completed: false }]);
    setTodoInput('');
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleSaveNote = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Title aur Description dono zaroori hain!');
      return;
    }

    setLoading(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      todos: todos,
       category_id: selectedCategoryId,
      user_id: UserID,
    };

    if (userNots?._id) {
      const userId = userNots?._id;
      try {
        const response = await notsUpdates(payload, userId);
        if (response.status === 201 || response.status === 200) {
          Alert.alert('Success', 'Note safaltapurvak save ho gaya! 🎉');
          resetForm();
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error saving note:', error?.response?.data || error.message);
        Alert.alert('Error', error?.response?.data?.message || 'Note save nahi ho paya.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await Notespost(payload);
        if (response.status === 201 || response.status === 200) {
          Alert.alert('Success', 'Note safaltapurvak save ho gaya! 🎉');
          resetForm();
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error saving note:', error?.response?.data || error.message);
        Alert.alert('Error', error?.response?.data?.message || 'Note save nahi ho paya.');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTodos([]);
    setSelectedCategoryId('');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AngleLeftIcon width={8} height={16} fill="#1A73E8" />
        </TouchableOpacity>
        <View >
          <Text style={styles.headerSubtitle}>New workspace note</Text>
          <Text style={styles.headerTitle}>
            {userNots?._id ? 'Edit note' : 'Create note'}
          </Text>
        </View>
      </View>

      {/* Card 1: Title, Category, Description */}
      <View style={styles.card}>
        <Text style={styles.label}>Note title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Launch checklist"
          placeholderTextColor="#9AA5B1"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
  {/* CATEGORY_OPTIONS ki jagah state wala array (categories) map karo */}
  {categories?.map((cat) => {
    // String name match karne ki jagah '_id' match karo
    const isSelected = selectedCategoryId === cat._id;

    return (
      <TouchableOpacity
        key={cat._id} // String key ki jagah MongoDB ki '_id'
        onPress={() => {
          
          setSelectedCategoryId(cat._id); // State me '_id' store ho rahi hai
        }}
        style={[
          styles.categoryChip,
          isSelected ? styles.categoryChipSelected : styles.categoryChipUnselected,
        ]}
      >
        <Text
          style={[
            styles.categoryChipText,
            isSelected ? styles.categoryTextSelected : styles.categoryTextUnselected,
          ]}
        >
          {cat.category_name} {/* Pure text ki jagah backend field 'category_name' */}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What needs to get done?"
          placeholderTextColor="#9AA5B1"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Card 2: Checklist */}
      <View style={styles.card}>
        <View style={styles.checklistHeaderRow}>
          <View>
            <Text style={styles.checklistTitle}>Checklist</Text>
            <Text style={styles.checklistSubtitle}>Break the work into clear steps</Text>
          </View>
          <TouchableOpacity style={styles.addTaskBtn} onPress={handleAddTodo}>
            <Text style={styles.addTaskBtnText}>+ Add task</Text>
          </TouchableOpacity>
        </View>

        {/* Task input row */}
        <TextInput
          style={styles.taskInput}
          placeholder="Type a task and tap Add task..."
          placeholderTextColor="#9AA5B1"
          value={todoInput}
          onChangeText={setTodoInput}
          onSubmitEditing={handleAddTodo}
        />

        {/* Added Todos */}
        {todos.map((item, index) => (
          <View key={index} style={styles.todoRow}>
            <View style={styles.todoCheckbox} />
            <Text style={styles.todoText} numberOfLines={1}>
              {item.task_text}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(index)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveBtn, loading && { opacity: 0.7 }]}
        onPress={handleSaveNote}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Save note</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    gap: 18,
  },
  backBtn: {
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
  backArrow: {
    fontSize: 18,
    color: '#1A73E8',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#9AA5B1',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1D20',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  label: {
    fontSize: 13,
    color: '#3B72E7',
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#F5F6F8',
    color: '#1A1D20',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEF0F3',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 4,
  },

  // Category chips
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryChipSelected: {
    backgroundColor: '#E3F0FF',
  },
  categoryChipUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADCE0',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#1A73E8',
  },
  categoryTextUnselected: {
    color: '#5F6368',
  },

  // Checklist card
  checklistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D20',
  },
  checklistSubtitle: {
    fontSize: 12.5,
    color: '#9AA5B1',
    marginTop: 2,
  },
  addTaskBtn: {
    backgroundColor: '#E3F0FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addTaskBtnText: {
    color: '#1A73E8',
    fontWeight: '700',
    fontSize: 13,
  },
  taskInput: {
    backgroundColor: '#F5F6F8',
    borderWidth: 1,
    borderColor: '#EEF0F3',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1D20',
    marginBottom: 12,
  },

  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    gap: 10,
  },
  todoCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  todoText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
  },
  removeText: {
    color: '#FF5252',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 4,
  },

  // Save button
  saveBtn: {
    backgroundColor: '#1A73E8',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 40,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});