# CodeQL and Application Security Triage

A small portfolio project by **Martin Yeboah** showing how I turn code scanning results into decisions engineers can act on. It pairs a CodeQL pull-request workflow with a runnable JavaScript triage demo and an example review.

| Start here | What it shows |
| --- | --- |
| [Security workflow](.github/workflows/security.yml) | Separate test and CodeQL jobs, scoped permissions, and PR and main-branch scans |
| [Triage demo](src/triage.mjs) | Deterministic prioritization using severity and exposure |
| [Reviewer walkthrough](docs/reviewer-walkthrough.md) | Evidence to collect, a remediation decision, and how to verify the fix |

## Try it locally

Requires Node.js 22 or newer. No dependencies, accounts, environment variables, or network access are needed for the demo.

```sh
npm test
npm run demo
```

The demo processes three fictional findings: a public high-severity issue that needs attention before release, a high-severity issue with unknown exposure that needs investigation, and an internal medium-severity issue to track. It does not ingest live CodeQL alerts, dismiss findings, create tickets, or enforce release decisions.

## How it fits together

1. A pull request targeting `main` runs the unit tests and CodeQL.
2. A reviewer checks the finding against the code, confirms reachability, and records an owner and next step.
3. After remediation, the reviewer checks the regression test and reruns analysis on the updated commit.
4. A maintainer can configure GitHub code scanning merge protection separately. A successful workflow run is not proof that there are no open alerts.

This is an original, synthetic demo, not a copy of an employer's repository, workflow, or findings. The triage output is a recommendation for a human reviewer.
