const severities = new Set(['critical', 'high', 'medium', 'low']);
const exposures = new Set(['public', 'internal', 'unknown']);
const priorities = Object.freeze({
  'fix-before-release': 0,
  'needs-review': 1,
  'track-remediation': 2,
});

export function triage(findings) {
  if (!Array.isArray(findings)) throw new TypeError('Findings must be an array.');
  const seen = new Set();
  return findings.map(finding => {
    if (!finding || typeof finding !== 'object' || typeof finding.id !== 'string'
      || !/^[A-Z][A-Z0-9-]{0,63}$/.test(finding.id)
      || !severities.has(finding.severity) || !exposures.has(finding.exposure)) {
      throw new TypeError('Each finding needs a valid ID, severity and exposure.');
    }
    const { id, severity, exposure } = finding;
    if (seen.has(id)) throw new TypeError('Finding IDs must be unique.');
    seen.add(id);
    let decision = 'track-remediation';
    let reason = 'Assign an owner, agree on a due date, and verify the fix.';
    if (severity === 'critical' || (severity === 'high' && exposure === 'public')) {
      decision = 'fix-before-release';
      reason = 'Prioritize human review and remediation before release.';
    } else if (severity === 'high' || exposure === 'unknown') {
      decision = 'needs-review';
      reason = 'Confirm reachability and impact before setting a due date.';
    }
    return { id, severity, exposure, decision, reason };
  }).sort((a, b) => priorities[a.decision] - priorities[b.decision] || a.id.localeCompare(b.id, 'en'));
}
