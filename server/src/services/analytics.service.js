import Analytics from '../models/Analytics.js';

export async function trackEvent(payload) {
  return Analytics.create(payload);
}

export async function getDashboardMetrics() {
  const totalEvents = await Analytics.countDocuments();
  const eventsByType = await Analytics.aggregate([
    { $group: { _id: '$eventType', count: { $sum: 1 } } },
  ]);
  const pageVisits = await Analytics.aggregate([
    { $match: { eventType: 'page_view' } },
    { $group: { _id: '$page', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  return {
    totalEvents,
    eventsByType,
    pageVisits,
  };
}
