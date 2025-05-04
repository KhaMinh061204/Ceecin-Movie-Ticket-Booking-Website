import express from 'express';
import { handleStripeWebhook } from '../controllers/webhook.js';

const webhookRouter = express.Router();

webhookRouter.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default webhookRouter;
