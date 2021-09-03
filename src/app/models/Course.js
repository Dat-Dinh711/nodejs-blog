const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        slug: { type: String, slug: 'name' },
        videoId: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Course', Course);
