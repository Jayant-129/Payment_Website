const {z} = require('zod');
const UserValidSchema = z.object({
    username : z.string().email().min(3).max(50),
    firstName : z.string().max(50),
    lastName : z.string().max(50),
    password : z.string().min(6)
}).strict();

const signInValidation = z.object({
    username: z.string().email().min(3).max(50),
    password : z.string().min(6)
}).strict();

const updateSchema = z.object({
    firstName : z.string().max(50).optional(),
    lastName : z.string().max(50).optional(),
    password : z.string().min(6).optional()
}).strict();

module.exports = {
    UserValidSchema,
    signInValidation,
    updateSchema
};