import Joi from 'joi';


export const itemSchema = Joi.object({
    id: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    unitePrice: Joi.number().required(),
}) 


export const clientSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),

  phone: Joi.string()
    .allow(null)
    .empty('')   
    .default(''),

  address: Joi.string()
    .allow(null)
    .empty('')
    .default(''),

  notes: Joi.string()
    .allow(null)
    .empty('')
    .default(''),

  totalInvoices: Joi.number().integer().min(0).default(0),
  outstanding: Joi.number().min(0).default(0),

  status: Joi.string()
    .valid('Active', 'Inactive', 'Archived')
    .default('Active'),
});

  


export const invoiceSchema = Joi.object({
    id: Joi.string().required(),
    invoiceId: Joi.string().required(),
    items: Joi.array().items(itemSchema).min(1).required(), 
    total: Joi.number().min(0).required(),
    date: Joi.date().required(),
    dueDate: Joi.date().optional(),
    clientId: Joi.string().required(),
    status: Joi.string().valid('paid', 'unpaid', 'overdue').optional()
  });
  

  export const senderSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().email().required(),    
    addressLine: Joi.string().optional(),
    phone: Joi.string().optional(),
    website: Joi.string().uri().optional(),
    currency: Joi.string().optional(),
    imgLogo: Joi.string().uri().optional(),
    taxId: Joi.string().optional(),
    paymentJSON: Joi.string().optional(),
    payment: Joi.object({
      defaultMethod: Joi.string().required(),
  
      methods: Joi.array()
        .items(
          Joi.object({
            type: Joi.string().required(),
            label: Joi.string().optional(),
            
            fields: Joi.object().pattern(
              Joi.string(),   
              Joi.string()    
            )
          })
        )
        .min(0)
        .required()
    }).optional()
  });
