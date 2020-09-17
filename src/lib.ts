export const timeFormat = (timestamp: number): string => {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp % 60);

  const a = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ];

  // if (hours > 0) {
  //   a.unshift(hours.toString().padStart(2, '0'));
  // }

  return a.join(':');
};
