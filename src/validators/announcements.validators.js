import { celebrate, Segments, Joi } from 'celebrate';

const announcementFields = {
  title: Joi.string().min(5).max(100),
  description: Joi.string().min(10),
  price: Joi.number().greater(0),
  category: Joi.string().valid('sale', 'service', 'job', 'other'),
  contactInfo: Joi.string().min(5),
};

export const getAnnouncementsValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    search: Joi.string().optional().allow(''),
    sort: Joi.string().valid('newest', 'oldest').optional(),
    page: Joi.number().integer().min(1).optional(),
  }),
});

export const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().required(),
  }),
});

export const createAnnouncementValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: announcementFields.title.required(),
    description: announcementFields.description.required(),
    price: announcementFields.price.required(),
    category: announcementFields.category.required(),
    contactInfo: announcementFields.contactInfo.required(),
  }),
});

export const updateAnnouncementValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().required(),
  }),
  [Segments.BODY]: Joi.object({
    title: announcementFields.title.optional(),
    description: announcementFields.description.optional(),
    price: announcementFields.price.optional(),
    category: announcementFields.category.optional(),
    contactInfo: announcementFields.contactInfo.optional(),
  }).min(1),
});
