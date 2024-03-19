import Joi from 'joi';

const authenticatePayloadSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});

const createOrUpdateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().optional(),
  surname: Joi.string().optional(),
  address: Joi.string().optional(),
  postCode: Joi.string().optional(),
  city: Joi.string().optional(),
  phone: Joi.string().optional(),
  isAdmin: Joi.boolean().optional(),
  avatar: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.boolean().optional(),
  policy: Joi.boolean().required()
});

const removeByIdSchema = Joi.object({
  id: Joi.string().required()
});

const activationSchema = Joi.object({
  hash: Joi.string().required()
});

const detailsPayloadSchema = Joi.object({
  specialization: Joi.string().required(),
  education_level: Joi.string().required(),
  study_system: Joi.string().required(),
  current_study_year: Joi.number().integer().min(1).required(),
  other_details: Joi.string().allow('').optional()
});

const createOrUpdateDetailsValidator = {
  params: getByIdSchema,
  payload: detailsPayloadSchema
};

const createOrUpdateStudentSchema = Joi.object({
  applicationId: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  pesel: Joi.string().regex(/^[0-9]{11}$/).length(11).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().regex(/^[0-9]{9}$/).length(9).optional(),
  address: Joi.string().required(),
  album_id: Joi.string().required()
});

const createAttachmentSchema = Joi.object({
  file_name: Joi.string().required(),
  file_data: Joi.string().base64().required()
});

const getByIdSchema = Joi.object({
  id: Joi.string().required()
});

const removeStudentSchema = Joi.object({
  id: Joi.string().required()
});

const removeAttachmentSchema = Joi.object({
  id: Joi.string().required()
});

const removeUserSchema = Joi.object({
  id: Joi.string().required()
});

const createOrUpdateApplicationSchema = Joi.object({
  params: {
    id: Joi.string().required()
  },
  payload: {
    album_id: Joi.string().required(),
    type: Joi.string().required(),
    details_id: Joi.string().required(),
    status: Joi.string().required(),
    attachment_id: Joi.string().required()
  }
});

const validators = {
  authenticatePayload: {
    payload: authenticatePayloadSchema
  },
  createOrUpdateUser: {
    payload: createOrUpdateUserSchema
  },
  removeById: {
    params: removeByIdSchema
  },
  activation: {
    params: activationSchema
  },
  createOrUpdateDetails: {
    createOrUpdateDetails: createOrUpdateDetailsValidator
  },
  createOrUpdateStudent: {
    payload: createOrUpdateStudentSchema
  },
  getById: {
    params: getByIdSchema
  },
  removeStudent: {
    params: removeStudentSchema
  },
  removeUser: {
    params: removeUserSchema
  },
  removeAttachment: {
    params: removeAttachmentSchema
  },
  createAttachment: {
    payload: createAttachmentSchema
  }
};

export default validators;
