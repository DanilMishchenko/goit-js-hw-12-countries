import { alert, Stack } from '@pnotify/core';

export function notification(type = 'error', text = 'Snth. wrong!') {
  const notify = new Stack({
    dir1: 'down',
    dir2: 'left',
    firstpos1: 40,
    firstpos2: 40,
  });

  const options = {
    type: type,
    title: 'ERROR',
    text: text,
    styling: 'brighttheme',
    delay: 1000,
    shadow: true,
    stack: notify,
  };

  alert(options);
}