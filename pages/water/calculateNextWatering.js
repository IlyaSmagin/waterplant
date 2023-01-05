export default function calculateNextWatering(
  lastWateringTime,
  wateringRegularity
) {
  //calculates num of hours passed from imput timestamp
  const date = new Date(lastWateringTime);
  const now = new Date();
  const timePassed = now - date;
  const time = wateringRegularity - Math.floor(timePassed / (1000 * 60 * 60));
  /* if (time > 0) {
      return `Next watering in ${time} hours.`;
    } else {
      return `You have to water the plant!`;
    } */
  return time;
}
