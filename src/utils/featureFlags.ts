const flags: Record<string, boolean> = {
  enableCheckout: true,
  enablePaymentRetry: true,
  showDiscountBanner: false,
};

export function isFeatureEnabled(flag: string): boolean {
  return flags[flag] ?? false;
}

export function setFeatureFlag(flag: string, enabled: boolean): void {
  flags[flag] = enabled;
}
