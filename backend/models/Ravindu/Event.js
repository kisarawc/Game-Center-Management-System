const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  imagePath: { type: String, required: true },
  eventDate:{type: Date},
  Venue:{type:String},
  // likes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User' // Reference to the User model
  //   }
  // ]

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
