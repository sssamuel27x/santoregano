const TIME_ZONE = 'Europe/Lisbon';
const OPEN_MINUTES = 12 * 60;
const CLOSE_MINUTES = 23 * 60;

function getLisbonParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  return formatter.formatToParts(date).reduce((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = part.value;
    return parts;
  }, {});
}

export function getRestaurantStatus(date = new Date()) {
  const parts = getLisbonParts(date);
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const closedForDay = parts.weekday === 'Monday';
  const open = !closedForDay && minutes >= OPEN_MINUTES && minutes < CLOSE_MINUTES;

  return {
    open,
    weekday: parts.weekday,
    currentTime: `${parts.hour}:${parts.minute}`,
    opensAt: '12:00',
    closesAt: '23:00',
    closedForDay,
  };
}
