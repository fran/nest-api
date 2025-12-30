import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3001),
  MONGO_URI: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(5),
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
});
