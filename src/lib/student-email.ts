const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_PUBLIC_EMAIL_DOMAINS = [
  "aol.com",
  "fastmail.com",
  "gmail.com",
  "googlemail.com",
  "hey.com",
  "hotmail.com",
  "hotmail.co.uk",
  "icloud.com",
  "live.com",
  "mail.com",
  "me.com",
  "msn.com",
  "outlook.com",
  "proton.me",
  "protonmail.com",
  "tuta.com",
  "tutanota.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yandex.com",
  "zoho.com",
] as const;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getAcademicDomainSuffixes(
  configuredSuffixes = process.env.STUDENT_EMAIL_DOMAIN_SUFFIXES,
): string[] {
  return (configuredSuffixes ?? "ac.ke,edu")
    .split(",")
    .map((suffix) => suffix.trim().toLowerCase().replace(/^\.+/, ""))
    .filter(Boolean);
}

export function getBlockedEmailDomains(
  configuredDomains = process.env.STUDENT_EMAIL_BLOCKED_DOMAINS,
): string[] {
  const configured = (configuredDomains ?? "")
    .split(",")
    .map((domain) => domain.trim().toLowerCase().replace(/^\.+/, ""))
    .filter(Boolean);

  return [...new Set([...DEFAULT_PUBLIC_EMAIL_DOMAINS, ...configured])];
}

function domainMatches(domain: string, candidate: string): boolean {
  const normalizedCandidate = candidate.toLowerCase().replace(/^\.+/, "");
  return (
    domain === normalizedCandidate || domain.endsWith(`.${normalizedCandidate}`)
  );
}

export function isSchoolEmail(
  email: string,
  suffixes = getAcademicDomainSuffixes(),
  blockedDomains = getBlockedEmailDomains(),
): boolean {
  const normalizedEmail = normalizeEmail(email);

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return false;
  }

  const domain = normalizedEmail.slice(normalizedEmail.lastIndexOf("@") + 1);

  if (blockedDomains.some((blocked) => domainMatches(domain, blocked))) {
    return false;
  }

  return suffixes.some((suffix) => domainMatches(domain, suffix));
}
