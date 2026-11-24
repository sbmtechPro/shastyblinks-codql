import { triage } from './triage.mjs';

const findings = [
  { id: 'DEMO-101', severity: 'high', exposure: 'public' },
  { id: 'DEMO-102', severity: 'high', exposure: 'unknown' },
  { id: 'DEMO-103', severity: 'medium', exposure: 'internal' },
];
console.log(JSON.stringify(triage(findings), null, 2));
