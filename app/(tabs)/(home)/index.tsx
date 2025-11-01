
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  Platform,
  Animated,
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import * as Speech from 'expo-speech';
import { colors, commonStyles } from "@/styles/commonStyles";

type AgeGroup = 'preschool' | 'elementary' | 'middle' | 'teen' | null;

export default function HomeScreen() {
  const theme = useTheme();
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [hasStarted, currentActivity]);

  const determineAgeGroup = (age: number): AgeGroup => {
    if (age >= 3 && age <= 5) return 'preschool';
    if (age >= 6 && age <= 10) return 'elementary';
    if (age >= 11 && age <= 13) return 'middle';
    if (age >= 14 && age <= 18) return 'teen';
    return null;
  };

  const speakName = () => {
    if (userName.trim()) {
      Speech.speak(`Hello ${userName}! Welcome to the learning game!`, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
      });
    }
  };

  const handleStart = () => {
    const age = parseInt(userAge);
    if (userName.trim() && age >= 3 && age <= 18) {
      const group = determineAgeGroup(age);
      setAgeGroup(group);
      setHasStarted(true);
      speakName();
      console.log(`User ${userName}, age ${age}, group: ${group}`);
    }
  };

  const getActivitiesForAgeGroup = () => {
    switch (ageGroup) {
      case 'preschool':
        return [
          {
            title: 'Learn Colors',
            description: 'Let&apos;s learn about different colors!',
            icon: 'paintpalette.fill',
            color: colors.accent,
            content: 'Colors are everywhere! Red like an apple, Blue like the sky, Yellow like the sun!',
          },
          {
            title: 'Count Numbers',
            description: 'Practice counting from 1 to 10',
            icon: 'number',
            color: colors.primary,
            content: 'Let&apos;s count together: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10! Great job!',
          },
          {
            title: 'Animal Sounds',
            description: 'What sounds do animals make?',
            icon: 'hare.fill',
            color: colors.secondary,
            content: 'Dogs say Woof! Cats say Meow! Cows say Moo! Birds say Tweet!',
          },
        ];
      case 'elementary':
        return [
          {
            title: 'Math Practice',
            description: 'Addition and subtraction fun!',
            icon: 'plus.forwardslash.minus',
            color: colors.primary,
            content: 'Let&apos;s practice: 5 + 3 = 8, 10 - 4 = 6. You&apos;re doing great!',
          },
          {
            title: 'Reading Time',
            description: 'Build your vocabulary',
            icon: 'book.fill',
            color: colors.accent,
            content: 'New words to learn: Adventure, Curious, Explore, Discover!',
          },
          {
            title: 'Science Facts',
            description: 'Discover amazing facts!',
            icon: 'flask.fill',
            color: colors.secondary,
            content: 'Did you know? The Earth orbits around the Sun! Plants make oxygen!',
          },
        ];
      case 'middle':
        return [
          {
            title: 'Algebra Basics',
            description: 'Introduction to equations',
            icon: 'function',
            color: colors.primary,
            content: 'Solve for x: 2x + 5 = 15. Subtract 5 from both sides: 2x = 10, so x = 5!',
          },
          {
            title: 'World Geography',
            description: 'Learn about countries and capitals',
            icon: 'globe',
            color: colors.accent,
            content: 'Capital cities: Paris (France), Tokyo (Japan), Cairo (Egypt), Canberra (Australia)',
          },
          {
            title: 'History Timeline',
            description: 'Important historical events',
            icon: 'clock.fill',
            color: colors.secondary,
            content: 'Key dates: 1776 - American Independence, 1969 - Moon Landing, 1989 - Fall of Berlin Wall',
          },
        ];
      case 'teen':
        return [
          {
            title: 'Advanced Math',
            description: 'Calculus and trigonometry',
            icon: 'chart.line.uptrend.xyaxis',
            color: colors.primary,
            content: 'Pythagorean theorem: a² + b² = c². Useful for calculating distances and angles!',
          },
          {
            title: 'Critical Thinking',
            description: 'Develop analytical skills',
            icon: 'brain.head.profile',
            color: colors.accent,
            content: 'Question assumptions, analyze evidence, consider multiple perspectives, draw conclusions.',
          },
          {
            title: 'Career Exploration',
            description: 'Discover your interests',
            icon: 'briefcase.fill',
            color: colors.secondary,
            content: 'Explore fields: STEM, Arts, Business, Healthcare, Education, Technology!',
          },
        ];
      default:
        return [];
    }
  };

  const activities = getActivitiesForAgeGroup();

  const speakContent = (content: string) => {
    Speech.speak(content, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.85,
    });
  };

  const renderWelcomeScreen = () => (
    <Animated.View style={[styles.welcomeContainer, { opacity: fadeAnim }]}>
      <View style={styles.iconContainer}>
        <IconSymbol name="graduationcap.fill" size={80} color={colors.primary} />
      </View>
      
      <Text style={[commonStyles.title, { color: colors.text }]}>
        Welcome to Learning Quest!
      </Text>
      
      <Text style={[commonStyles.text, { color: colors.textSecondary, marginBottom: 32 }]}>
        Let&apos;s get to know you better
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[commonStyles.subtitle, { fontSize: 18, marginBottom: 8 }]}>
          What&apos;s your name?
        </Text>
        <TextInput
          style={[commonStyles.input, { borderColor: colors.primary }]}
          placeholder="Enter your name"
          placeholderTextColor={colors.textSecondary}
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="words"
        />

        <Text style={[commonStyles.subtitle, { fontSize: 18, marginBottom: 8, marginTop: 16 }]}>
          How old are you?
        </Text>
        <TextInput
          style={[commonStyles.input, { borderColor: colors.primary }]}
          placeholder="Enter your age (3-18)"
          placeholderTextColor={colors.textSecondary}
          value={userAge}
          onChangeText={setUserAge}
          keyboardType="number-pad"
          maxLength={2}
        />

        <Pressable
          style={[
            styles.startButton,
            (!userName.trim() || !userAge.trim()) && styles.startButtonDisabled
          ]}
          onPress={handleStart}
          disabled={!userName.trim() || !userAge.trim()}
        >
          <Text style={styles.startButtonText}>Start Learning!</Text>
          <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
        </Pressable>

        <Pressable
          style={styles.pronounceButton}
          onPress={speakName}
          disabled={!userName.trim()}
        >
          <IconSymbol name="speaker.wave.2.fill" size={20} color={colors.primary} />
          <Text style={[styles.pronounceButtonText, { color: colors.primary }]}>
            Hear my name
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );

  const renderLearningScreen = () => (
    <Animated.View style={[styles.learningContainer, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={[commonStyles.title, { fontSize: 24 }]}>
          Hi {userName}! 👋
        </Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 24 }]}>
          Age {userAge} - {ageGroup === 'preschool' ? 'Preschool' : 
                          ageGroup === 'elementary' ? 'Elementary' :
                          ageGroup === 'middle' ? 'Middle School' : 'Teen'} Level
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity, index) => (
          <Pressable
            key={index}
            style={[styles.activityCard, { backgroundColor: colors.card }]}
            onPress={() => {
              setCurrentActivity(index);
              speakContent(activity.content);
            }}
          >
            <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
              <IconSymbol name={activity.icon as any} size={32} color="#FFFFFF" />
            </View>
            
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                {activity.title}
              </Text>
              <Text style={[styles.activityDescription, { color: colors.textSecondary }]}>
                {activity.description}
              </Text>
            </View>

            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
        ))}

        {currentActivity !== null && activities[currentActivity] && (
          <View style={[styles.contentCard, { backgroundColor: colors.highlight }]}>
            <View style={styles.contentHeader}>
              <IconSymbol 
                name={activities[currentActivity].icon as any} 
                size={40} 
                color={activities[currentActivity].color} 
              />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, flex: 1 }]}>
                {activities[currentActivity].title}
              </Text>
            </View>
            
            <Text style={[commonStyles.text, { color: colors.text, marginTop: 16 }]}>
              {activities[currentActivity].content}
            </Text>

            <Pressable
              style={[styles.speakButton, { backgroundColor: activities[currentActivity].color }]}
              onPress={() => speakContent(activities[currentActivity].content)}
            >
              <IconSymbol name="speaker.wave.2.fill" size={20} color="#FFFFFF" />
              <Text style={styles.speakButtonText}>Read Aloud</Text>
            </Pressable>
          </View>
        )}

        <Pressable
          style={[styles.resetButton, { backgroundColor: colors.textSecondary }]}
          onPress={() => {
            setHasStarted(false);
            setUserName('');
            setUserAge('');
            setAgeGroup(null);
            setCurrentActivity(0);
            Speech.stop();
          }}
        >
          <IconSymbol name="arrow.counterclockwise" size={20} color="#FFFFFF" />
          <Text style={styles.resetButtonText}>Start Over</Text>
        </Pressable>
      </ScrollView>
    </Animated.View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Learning Quest",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {!hasStarted ? renderWelcomeScreen() : renderLearningScreen()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  learningContainer: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  pronounceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  pronounceButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 100,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  activityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  contentCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  speakButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
    gap: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
