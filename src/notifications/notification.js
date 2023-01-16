import * as Notifications from 'expo-notifications';

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Olá Bruno!",
      body: 'És bué fudido naquilo que fazes. Parabéns.',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}