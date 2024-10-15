export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const capitalizeAll = (s) => {
    if (typeof s !== 'string') return ''
    return s.replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase(); });
}

export const appendLeadingZeroes = (number) => {
    if (number <= 9) return "0" + number;
    return number
}

export const getDateFormatted = (date) => {
    return date.getFullYear() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate())
}