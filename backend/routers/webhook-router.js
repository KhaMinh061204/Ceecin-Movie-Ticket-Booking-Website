import express from 'express';
import { handleStripeWebhook } from '../controllers/webhook.js';

const webhookRouter = express.Router();

webhookRouter.post('/', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default webhookRouter;
