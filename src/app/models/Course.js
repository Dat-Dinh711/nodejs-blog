const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        slug: { type: String, slug: 'name' },
        videoId: { type: String, required: true, unique: true },
        deleted: { type: Boolean },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
    },
);

// Add plugin
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
