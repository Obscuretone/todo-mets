import { Request, Response, NextFunction } from 'express';
import client from 'prom-client';

// Create a new registry for Prometheus metrics
const register = new client.Registry();

// Create a custom metric (example: up metric to check if your app is running?)
const appUp = new client.Gauge({
    name: 'app_up',
    help: 'Is the app up and running?',
});

register.registerMetric(appUp);

// Create metrics for request count and duration
const requestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 5, 10], // Buckets for latency tracking
});

const requestCount = new client.Counter({
    name: 'http_request_count',
    help: 'Total HTTP requests made',
});

register.registerMetric(requestDuration);
register.registerMetric(requestCount);

// Middleware to track request count and duration
export const requestMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const end = requestDuration.startTimer();
    res.on('finish', () => {
        // Increment request count
        requestCount.inc();

        // Record the duration for the request
        end();
    });
    next();
};

// Middleware for metrics endpoint
export const metricsEndpoint = async (req: Request, res: Response) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
};

// Export metrics
export { appUp };