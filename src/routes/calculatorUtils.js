// Convert interval to seconds
export function intervalToSeconds(interval, unit) {
  const multipliers = {
    s: 1,
    m: 60,
    h: 3600,
  };
  return interval * multipliers[unit];
}

// Calculate time window in seconds
export function calculateTimeWindow(timeFrom, timeTo) {
  const [fromHours, fromMinutes] = timeFrom.split(":").map(Number);
  const [toHours, toMinutes] = timeTo.split(":").map(Number);

  let seconds =
    toHours * 3600 + toMinutes * 60 - (fromHours * 3600 + fromMinutes * 60);
  if (seconds < 0) seconds += 24 * 3600; // Handle crossing midnight
  return seconds;
}

// Poisson random number generator
export function poissonRandom(lambda) {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;

  do {
    k++;
    p *= Math.random();
  } while (p > L);

  return k - 1;
}

// Calculate load statistics for each pattern
export function calculateLoadStats(load, DAU) {
  const userCount = (DAU * load.userPercentage) / 100;
  const intervalInSeconds = intervalToSeconds(load.interval, load.intervalUnit);
  const timeWindow = calculateTimeWindow(load.timeFrom, load.timeTo);

  // Calculate lambda (average events per second)
  const totalRequestsInWindow = (timeWindow / intervalInSeconds) * userCount;
  const lambda = totalRequestsInWindow / timeWindow;

  // Simulate peak load using Poisson distribution
  let maxRequests = 0;
  for (let i = 0; i < 100; i++) {
    const requests = poissonRandom(lambda);
    maxRequests = Math.max(maxRequests, requests);
  }

  return {
    name: load.name,
    avgRequestsPerSecond: lambda.toFixed(2),
    avgRequestsPerMinute: (lambda * 60).toFixed(2),
    peakRequestsPerSecond: maxRequests,
    peakRequestsPerMinute: maxRequests * 60,
    activeUsers: userCount.toFixed(0),
  };
}
