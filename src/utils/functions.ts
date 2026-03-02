export function getRequiredCookies(): string {

  const REQUIRED_COOKIES: string[] = [
    'token',
    'refresh_token'
  ];

  const requiredSet = new Set(REQUIRED_COOKIES);

  return document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(c => requiredSet.has(c.split('=')[0].trim()))
    .join('; ');
}


export async function clearCookies(): Promise<void> {

  const TUNNEL_COOKIES = [
    '.Tunnels.Relay.WebForwarding.Cookies',
    'tunnel_phishing_protection'
  ];

  const tunnelSet = new Set(TUNNEL_COOKIES);

  if (document.cookie) {

    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();

      if (!tunnelSet.has(name)) {
        document.cookie =
          `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  }
  else {
    try {
      await fetch('/api/auth/logout');
    } catch {}
  }
}


export function scrollToBottom(): void {

  const element: HTMLElement | null = document.getElementById('result');

  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });
}