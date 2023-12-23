export const formatDate = (date) => {
  if (!date) {
    return 'Date unknown';
  }
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatCustomDateTime = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export const calculateTimeUntil = (date) => {
    if (!date) {
      return '';
    }
    const eventDate = new Date(date);
    const currentDate = new Date();

    // Calculate time difference in milliseconds
    const timeDifference = eventDate.getTime() - currentDate.getTime();

    if (timeDifference < 0) {
        // Event has already happened
        return 'Already happened';
    } else {
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        if (daysDifference === 0) {
            // Event is happening today, calculate hours
            const hoursDifference = Math.floor(timeDifference / (1000 * 3600));
            return `In ${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'}`;
        } else {
            // Event is in the future, calculate days
            return `In ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'}`;
        }
    }
};

export const getEventMonth = (date) => {
  const month = new Date(date).toLocaleString('default', { month: 'short' });
  return month;
};

export const getEventDay = (date) => {
  const day = new Date(date).toLocaleString('default', { day: 'numeric' });
  return day;
}

export const formatShortDateTime = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return 'Date unknown';
  }
  console.log(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};