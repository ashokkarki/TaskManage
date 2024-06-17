export const calculateLongestStreak = (tasks) => {
    let maxStreak = 0;
    let currentStreak = 0;
  
    tasks.forEach((task) => {
      if (task.completed) {
        currentStreak += 1;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
  
    return maxStreak;
  };
  