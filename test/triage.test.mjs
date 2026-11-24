import test from 'node:test';
import assert from 'node:assert/strict';
import { triage } from '../src/triage.mjs';

const item = (id, severity, exposure) => ({ id, severity, exposure });

test('sorts release priorities, then uses ID for a stable tie-break', () => {
  const result = triage([item('T-C', 'low', 'internal'), item('T-D', 'critical', 'internal'),
    item('T-B', 'high', 'public'), item('T-A', 'high', 'internal')]);
  assert.deepEqual(result.map(x => [x.id, x.decision]), [
    ['T-B', 'fix-before-release'], ['T-D', 'fix-before-release'],
    ['T-A', 'needs-review'], ['T-C', 'track-remediation'],
  ]);
});

test('unknown exposure requires review even for medium findings', () => {
  assert.equal(triage([item('T-A', 'medium', 'unknown')])[0].decision, 'needs-review');
});

test('keeps critical findings urgent when exposure is unknown', () => {
  assert.equal(triage([item('T-A', 'critical', 'unknown')])[0].decision, 'fix-before-release');
});

test('repeated finding IDs and invalid records are rejected', () => {
  const one = item('T-A', 'low', 'internal');
  assert.throws(() => triage([one, one]), /unique/);
  for (const invalid of [null, item('t-a', 'low', 'internal'),
    item('T-A', 'urgent', 'internal'), item('T-A', 'high', 'unverified')]) {
    assert.throws(() => triage([invalid]), /valid/);
  }
  assert.throws(() => triage({}), /array/);
});

test('does not mutate input or propagate fields outside the schema', () => {
  const input = Object.freeze([Object.freeze({ ...item('T-A', 'high', 'public'), privateNote: 'example' })]);
  assert.equal(input[0].privateNote, 'example');
  assert.equal('privateNote' in triage(input)[0], false);
});

test('an empty input produces no findings', () => assert.deepEqual(triage([]), []));
