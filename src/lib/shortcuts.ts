import { useEffect, useState } from 'react';

type OS = 'mac' | 'windows' | 'linux' | 'other';

export function getOS(): OS {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('win')) return 'windows';
  if (ua.includes('linux')) return 'linux';
  return 'other';
}

export function useShortcuts() {
  const [os, setOs] = useState<OS>('other');

  useEffect(() => {
    setOs(getOS());
  }, []);

  const symbols = {
    mod: os === 'mac' ? '⌘' : 'Ctrl',
    opt: os === 'mac' ? '⌥' : 'Alt',
    shift: os === 'mac' ? '⇧' : 'Shift',
    enter: '↵',
  };

  return { os, symbols };
}
