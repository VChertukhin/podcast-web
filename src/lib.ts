export const timeFormat = (timestamp: number): string => {
  return [
    Math.floor(timestamp / 60)
      .toString()
      .padStart(2, '0'),
    Math.floor(timestamp % 60)
      .toString()
      .padStart(2, '0'),
  ].join(':');
};
