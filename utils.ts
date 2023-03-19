export function convertTimestampToDateString(timestamp: number | undefined): string {
    if (timestamp == undefined) {
        return "---";
    }

    return new Date(timestamp).toLocaleDateString();
}