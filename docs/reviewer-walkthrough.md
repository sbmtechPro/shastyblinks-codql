# Reviewer walkthrough

## Scenario: unexpected fields in an application response

This is a fictional review, not an alert produced by this repository. A customer-facing endpoint should return only a display name, but the proposed change returns a full account record. The concern is exposure of unnecessary internal attributes (CWE-200).

| Review step | What to verify |
| --- | --- |
| Confirm the finding | Trace the response from its data source to serialization. Check which fields actually reach the client and which callers can reach the endpoint. |
| Decide | If the endpoint is accessible to external callers and exposes internal fields, request a fix before release. If reachability is unknown, investigate it rather than assuming the finding is safe. |
| Remediate | Return an explicit response object containing only fields in the API contract. Add a regression test that compares the complete set of response fields against the contract. |
| Verify | Review the exact fixed commit. Confirm the test passes and the relevant scan completes. Record the test link and scan evidence with the disposition. |

**Example review comment:** Reviewer observed that the response is built from the full account record instead of the approved response fields. Please return only the fields in the API contract and add a test that rejects unexpected fields. Keep the finding open until the fix is verified.

Tool output supports the decision; it does not replace code review. A missing or failed scan is not evidence of remediation.
