import { asyncHandler } from '../utils/asyncHandler.js';
import { trackEvent, getDashboardMetrics } from '../services/analytics.service.js';

export const trackAnalytics = asyncHandler(async (req, res) => {
  const payload = {
    eventType: req.body.eventType || 'page_view',
    page: req.body.page || '',
    projectSlug: req.body.projectSlug || '',
    browser: req.body.browser || req.headers['user-agent'] || '',
    device: req.body.device || 'unknown',
    country: req.body.country || '',
    referrer: req.body.referrer || req.headers.referer || '',
    sessionDuration: Number(req.body.sessionDuration) || 0,
    ip: req.ip,
  };

  const analytics = await trackEvent(payload);

  res.status(201).json({ status: 'success', data: analytics });
});

export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const metrics = await getDashboardMetrics();
  res.status(200).json({ status: 'success', data: metrics });
});
