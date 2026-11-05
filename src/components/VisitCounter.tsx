/**
 * Discreet visit counter. Counts once per browser session (sessionStorage) and
 * never on localhost, so testing does not inflate the number. Uses the free
 * Abacus counter service; if it fails the component renders nothing.
 */
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BASE = 'https://abacus.jasoncameron.dev';
const NS = 'pushodev-portfolio';
const KEY = 'visits';

const VisitCounter: React.FC = () => {
  const { language } = useLanguage();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const local = ['localhost', '127.0.0.1'].includes(location.hostname);
    let counted = false;
    try {
      counted = sessionStorage.getItem('visit-counted') === '1';
    } catch {
      /* storage unavailable */
    }
    const action = local || counted ? 'get' : 'hit';
    fetch(`${BASE}/${action}/${NS}/${KEY}`)
      .then((r) => (r.ok ? r.json() : r.status === 404 ? { value: 0 } : null))
      .then((d) => {
        if (d && typeof d.value === 'number') setCount(d.value);
        if (action === 'hit') {
          try {
            sessionStorage.setItem('visit-counted', '1');
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"
      title={language === 'es' ? 'Visitas a este portfolio' : 'Visits to this portfolio'}
    >
      <Eye className="w-3 h-3" />
      {count.toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}
      <span className="sr-only">{language === 'es' ? ' visitas' : ' visits'}</span>
    </span>
  );
};

export default VisitCounter;
