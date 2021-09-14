const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        slug: { type: String, slug: 'name' },
        videoId: { type: String, required: true, unique: true },
        deleted: { type: Boolean },
        deletedAt: { type: Date },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Add plugin
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

Course.plugin(AutoIncrement);

mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
