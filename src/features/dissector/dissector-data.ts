import type { StudioMode } from "@/lib/theme/design-tokens";

export type FlowNodeId =
  | "browser"
  | "visibility"
  | "listener"
  | "counter"
  | "timer"
  | "submit"
  | "server";

export type FlowNode = {
  id: FlowNodeId;
  label: string;
  shortLabel: string;
  detail: string;
  lineStart: number;
  lineEnd: number;
  x: number;
  y: number;
};

export type FlowEdge = {
  id: string;
  from: FlowNodeId;
  to: FlowNodeId;
  path: string;
};

export const flowNodes = [
  {
    id: "browser",
    label: "Browser Tab",
    shortLabel: "Tab",
    detail: "Contest room runtime",
    lineStart: 6,
    lineEnd: 10,
    x: 92,
    y: 88
  },
  {
    id: "visibility",
    label: "Visibility API",
    shortLabel: "Visibility",
    detail: "Reads document.hidden",
    lineStart: 27,
    lineEnd: 33,
    x: 338,
    y: 88
  },
  {
    id: "listener",
    label: "Event Listener",
    shortLabel: "Listener",
    detail: "Subscribes to tab state",
    lineStart: 45,
    lineEnd: 49,
    x: 584,
    y: 88
  },
  {
    id: "counter",
    label: "Violation Counter",
    shortLabel: "Counter",
    detail: "Escalates repeated exits",
    lineStart: 35,
    lineEnd: 43,
    x: 818,
    y: 216
  },
  {
    id: "timer",
    label: "Grace Period Timer",
    shortLabel: "10s Timer",
    detail: "Gives a fair return window",
    lineStart: 18,
    lineEnd: 23,
    x: 584,
    y: 366
  },
  {
    id: "submit",
    label: "Auto-Submit Trigger",
    shortLabel: "Submit",
    detail: "Locks and submits attempt",
    lineStart: 11,
    lineEnd: 25,
    x: 338,
    y: 366
  },
  {
    id: "server",
    label: "Server JWT Validation",
    shortLabel: "JWT",
    detail: "Verifies identity server-side",
    lineStart: 53,
    lineEnd: 65,
    x: 92,
    y: 366
  }
] satisfies FlowNode[];

export const flowEdges = [
  {
    id: "browser-visibility",
    from: "browser",
    to: "visibility",
    path: "M154 88 C214 54 276 54 276 88"
  },
  {
    id: "visibility-listener",
    from: "visibility",
    to: "listener",
    path: "M400 88 C460 54 522 54 522 88"
  },
  {
    id: "listener-counter",
    from: "listener",
    to: "counter",
    path: "M646 101 C724 116 778 151 795 182"
  },
  {
    id: "counter-timer",
    from: "counter",
    to: "timer",
    path: "M790 250 C742 321 676 356 646 366"
  },
  {
    id: "timer-submit",
    from: "timer",
    to: "submit",
    path: "M522 366 C462 402 400 402 400 366"
  },
  {
    id: "submit-server",
    from: "submit",
    to: "server",
    path: "M276 366 C216 402 154 402 154 366"
  }
] satisfies FlowEdge[];

export const antiCheatCodeLines = [
  "const MAX_VIOLATIONS = 3;",
  "const GRACE_PERIOD_MS = 10_000;",
  "",
  "type AntiCheatEvent = \"tab-hidden\" | \"shortcut-switch\" | \"focus-lost\";",
  "",
  "export function attachContestGuard({ contestId, accessToken, csrf }: GuardArgs) {",
  "  let violations = 0;",
  "  let graceTimer: ReturnType<typeof window.setTimeout> | null = null;",
  "  let submitted = false;",
  "",
  "  const queueAutoSubmit = async (reason: AntiCheatEvent) => {",
  "    if (submitted) return;",
  "    submitted = true;",
  "",
  "    await fetch(`/api/contests/${contestId}/submit`, {",
  "      method: \"POST\",",
  "      headers: {",
  "        Authorization: `Bearer ${accessToken}`,",
  "        \"Content-Type\": \"application/json\",",
  "        \"X-CSRF-Token\": csrf",
  "      },",
  "      body: JSON.stringify({ reason, mode: \"auto-submit\" })",
  "    });",
  "  };",
  "",
  "  const handleVisibilityChange = () => {",
  "    if (!document.hidden) {",
  "      if (graceTimer) window.clearTimeout(graceTimer);",
  "      graceTimer = null;",
  "      return;",
  "    }",
  "",
  "    registerViolation(\"tab-hidden\");",
  "  };",
  "",
  "  const registerViolation = (reason: AntiCheatEvent) => {",
  "    violations += 1;",
  "",
  "    if (violations < MAX_VIOLATIONS) return;",
  "",
  "    graceTimer = window.setTimeout(() => {",
  "      void queueAutoSubmit(reason);",
  "    }, GRACE_PERIOD_MS);",
  "  };",
  "",
  "  document.addEventListener(\"visibilitychange\", handleVisibilityChange);",
  "  window.addEventListener(\"blur\", () => registerViolation(\"focus-lost\"));",
  "",
  "  return () => {",
  "    document.removeEventListener(\"visibilitychange\", handleVisibilityChange);",
  "  };",
  "}",
  "",
  "export async function POST(request: Request, context: RouteContext) {",
  "  const token = getBearerToken(request.headers.get(\"Authorization\"));",
  "  const claims = await verifyJwt(token);",
  "",
  "  if (claims.contestId !== context.params.contestId) {",
  "    return Response.json({ error: \"contest-mismatch\" }, { status: 403 });",
  "  }",
  "",
  "  await submitAttempt({",
  "    userId: claims.sub,",
  "    contestId: claims.contestId,",
  "    source: \"anti-cheat-engine\"",
  "  });",
  "",
  "  return Response.json({ ok: true });",
  "}"
] as const;

export const reasoningPrompts = [
  {
    title: "Why Visibility API over focus and blur",
    body:
      "[RAUNAK_NOTE] Explain why document.visibilityState gave a more direct signal for tab-level cheating behavior than focus or blur alone, especially when browser chrome, devtools, and OS focus shifts can create noisy events."
  },
  {
    title: "Why 10 seconds, not instant",
    body:
      "[RAUNAK_NOTE] Explain the fairness tradeoff: accidental switches, lag, and accessibility realities needed a grace period, but the window still had to be short enough to protect contest integrity."
  },
  {
    title: "The keyboard-switching edge case",
    body:
      "[RAUNAK_NOTE] Describe the edge case where users can leave the contest through keyboard shortcuts or browser chrome interactions, and how the system treated visibility and blur signals together."
  },
  {
    title: "Why auto-submit had to be server-side",
    body:
      "[RAUNAK_NOTE] Explain why disabling the UI on the client was not enough: a determined user can tamper with client state, so the server needed to validate JWT claims and finalize the attempt."
  },
  {
    title: "What this says about my engineering style",
    body:
      "[RAUNAK_NOTE] Connect the system back to your portfolio story: practical UX judgment, security-aware implementation, and product thinking under real contest pressure."
  }
] as const;

export const dissectorModeNouns = {
  doctor: "diagnosis",
  fashion: "pattern room",
  literary: "margin notes",
  electronics: "signal trace",
  aiLab: "runtime trace"
} satisfies Record<StudioMode, string>;
