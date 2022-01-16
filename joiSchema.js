const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.escapeHTML': '{{#label}} must not include HTML!'
        },
        rules: {
            escapeHTML: {
                validate(value, helpers) {
                    const clean = sanitizeHTML(value, {
                        allowedTags: [],
                        allowedAttributes:{},
                    });
                    if (clean !== value) return helpers.error('string.escapeHTML', { value });
                    
                    return clean;
                }
            }
        }
    }
}


const joi = BaseJoi.extend(extension);

module.exports.productSchema =joi.object({
    name: joi.string().required().escapeHTML(),
    price :joi.number().min(0).required(),
    img:  joi.string().required(),
    desc : joi.string().required().escapeHTML()
});

module.exports.reviewSchema =joi.object({
    rating:joi.number().min(0).max(5),
    comment :joi.string().required().escapeHTML()
})
