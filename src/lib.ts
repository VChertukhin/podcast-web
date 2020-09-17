export const timeFormat = (timestamp: number): string => {
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp % 60);

  const a = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ];

  return a.join(':');
};
