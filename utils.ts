export function convertTimestampToDateString(
  timestamp: number | undefined
): string {
  if (timestamp == undefined) {
    return "---";
  }

  return new Date(timestamp).toLocaleDateString();
}

export function getYearFromString(str: string): string {
  return str.substring(str.length - 4);
}
