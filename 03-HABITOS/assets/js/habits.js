const HEATMAP_DAYS = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getYesterdayDateString() {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function generateHabitId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function createHabit(habits, name, emoji = "🎯") {
  const newHabit = {
    id: generateHabitId(),
    name: name,
    emoji: emoji,
    createdAt: getTodayDateString(),
    streak: 0,
    lastCompletedDate: null,
    history: [],
  };
  return [...habits, newHabit];
}

function deleteHabit(habits, habitId) {
  return habits.filter((habit) => habit.id !== habitId);
}

function editHabitName(habits, habitId, newName) {
  return habits.map((habit) => {
    if (habit.id !== habitId) {
      return habit;
    }
    return { ...habit, name: newName };
  });
}

function editHabit(habits, habitId, newName, newEmoji) {
  return habits.map((habit) => {
    if (habit.id !== habitId) {
      return habit;
    }
    return { ...habit, name: newName, emoji: newEmoji };
  });
}

function isCompletedToday(habit) {
  return habit.lastCompletedDate === getTodayDateString();
}

function toggleToday(habits, habitId) {
  const today = getTodayDateString();
  return habits.map((habit) => {
    if (habit.id !== habitId) {
      return habit;
    }

    if (isCompletedToday(habit)) {
      const history = habit.history.filter((date) => date !== today);
      const previousStreak = Math.max(habit.streak - 1, 0);
      const lastCompletedDate = history.length > 0 ? history[history.length - 1] : null;
      return {
        ...habit,
        history,
        streak: previousStreak,
        lastCompletedDate,
      };
    }

    const history = [...habit.history, today];
    const wasCompletedYesterday = habit.lastCompletedDate === getYesterdayDateString();
    const streak = wasCompletedYesterday ? habit.streak + 1 : 1;

    return {
      ...habit,
      history,
      streak,
      lastCompletedDate: today,
    };
  });
}

function recalculateStreaks(habits) {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  return habits.map((habit) => {
    if (!habit.lastCompletedDate) {
      return habit;
    }
    const isStillValid = habit.lastCompletedDate === today || habit.lastCompletedDate === yesterday;
    if (isStillValid) {
      return habit;
    }
    return { ...habit, streak: 0 };
  });
}

function getHeatmapData(habit) {
  const days = [];
  const historySet = new Set(habit.history);

  for (let i = HEATMAP_DAYS - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * MS_PER_DAY);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    days.push({
      date: dateString,
      completed: historySet.has(dateString),
    });
  }

  return days;
}

function getBestStreak(habits) {
  return habits.reduce((best, habit) => Math.max(best, habit.streak), 0);
}

function getCompletedTodayCount(habits) {
  return habits.filter((habit) => isCompletedToday(habit)).length;
}
