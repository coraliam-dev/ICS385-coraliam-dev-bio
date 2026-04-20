export const arrivalsByIsland = {
  Maui: [
    { month: 'Jan', arrivals: 236000 },
    { month: 'Feb', arrivals: 228000 },
    { month: 'Mar', arrivals: 248000 },
    { month: 'Apr', arrivals: 220000 },
    { month: 'May', arrivals: 214000 },
    { month: 'Jun', arrivals: 226000 },
    { month: 'Jul', arrivals: 245000 },
    { month: 'Aug', arrivals: 251000 },
    { month: 'Sep', arrivals: 205000 },
    { month: 'Oct', arrivals: 214000 },
    { month: 'Nov', arrivals: 198000 },
    { month: 'Dec', arrivals: 241000 },
  ],
  "O'ahu": [
    { month: 'Jan', arrivals: 402000 },
    { month: 'Feb', arrivals: 389000 },
    { month: 'Mar', arrivals: 417000 },
    { month: 'Apr', arrivals: 383000 },
    { month: 'May', arrivals: 375000 },
    { month: 'Jun', arrivals: 393000 },
    { month: 'Jul', arrivals: 421000 },
    { month: 'Aug', arrivals: 430000 },
    { month: 'Sep', arrivals: 362000 },
    { month: 'Oct', arrivals: 370000 },
    { month: 'Nov', arrivals: 351000 },
    { month: 'Dec', arrivals: 410000 },
  ],
  "Kaua'i": [
    { month: 'Jan', arrivals: 102000 },
    { month: 'Feb', arrivals: 97000 },
    { month: 'Mar', arrivals: 109000 },
    { month: 'Apr', arrivals: 96000 },
    { month: 'May', arrivals: 93000 },
    { month: 'Jun', arrivals: 99000 },
    { month: 'Jul', arrivals: 111000 },
    { month: 'Aug', arrivals: 114000 },
    { month: 'Sep', arrivals: 91000 },
    { month: 'Oct', arrivals: 94000 },
    { month: 'Nov', arrivals: 86000 },
    { month: 'Dec', arrivals: 107000 },
  ],
}

export const originByIsland = {
  Maui: {
    labels: ['U.S. Domestic', 'Japan', 'Canada', 'Other International'],
    values: [74, 6, 12, 8],
  },
  "O'ahu": {
    labels: ['U.S. Domestic', 'Japan', 'Canada', 'Other International'],
    values: [63, 16, 7, 14],
  },
  "Kaua'i": {
    labels: ['U.S. Domestic', 'Japan', 'Canada', 'Other International'],
    values: [79, 4, 11, 6],
  },
}

export const metricsByIsland = {
  Maui: {
    adr: 395,
    occupancy: 78,
    staySeries: [8.06, 8.09, 8.08, 8.17, 8.25, 8.19, 8.14, 8.03, 8.07],
  },
  "O'ahu": {
    adr: 312,
    occupancy: 81,
    staySeries: [7.36, 7.38, 7.31, 6.95, 6.78, 6.82, 6.79, 6.75, 6.9],
  },
  "Kaua'i": {
    adr: 356,
    occupancy: 75,
    staySeries: [7.46, 7.51, 7.53, 7.64, 7.7, 7.63, 7.66, 7.5, 7.48],
  },
}
