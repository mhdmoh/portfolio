/**
 * Full years between a career start date and `asOf`.
 * Always pair the result with a trailing "+" in display copy (e.g. "5+").
 */
export function yearsOfExperience(careerStart: string | Date, asOf: Date = new Date()): number {
  const start =
    typeof careerStart === "string"
      ? parseCareerStart(careerStart)
      : new Date(careerStart.getFullYear(), careerStart.getMonth(), careerStart.getDate());

  let years = asOf.getFullYear() - start.getFullYear();
  const anniversaryReached =
    asOf.getMonth() > start.getMonth() ||
    (asOf.getMonth() === start.getMonth() && asOf.getDate() >= start.getDate());
  if (!anniversaryReached) years -= 1;
  return Math.max(years, 0);
}

/** Parse YYYY-MM-DD as a local calendar date (avoids UTC off-by-one). */
export function parseCareerStart(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** e.g. "5+ years software engineering" */
export function experienceLabel(
  careerStart: string,
  phrase: string,
  asOf?: Date,
): string {
  return `${yearsOfExperience(careerStart, asOf)}+ years ${phrase}`;
}
