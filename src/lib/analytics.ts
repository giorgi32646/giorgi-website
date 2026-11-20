type TrackProps = Record<string, string | number | boolean | undefined>;

type Whop = {
  track: (event: string, ...args: unknown[]) => void;
};

function whop(): Whop | undefined {
  return (window as Window & { whop?: Whop }).whop;
}

export function track(event: string, props?: TrackProps) {
  const payload = Object.fromEntries(
    Object.entries(props ?? {}).filter(([, value]) => value !== undefined),
  );
  whop()?.track(event, payload);
}

export function trackPage(path: string) {
  whop()?.track("page", { path });
}
