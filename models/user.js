const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {type: String, default:"user"},
  phone: {type: String, default:" ", unique: true},
  password: {type: String, default:" "},
})


UserSchema.methods = {
  /**
   * 
   * @param {String} password 
   * @returns {Boolean}
   */
  authenticate: (password)=>{
    return password === this.password;
  },
}

UserSchema.statics = {
  /**
   * 
   * @param {String} phone 
   * @param {Function} cb 
   * @returns 
   */
  find_by_phone: (phone, cb)=>{
    return this.findOne({phone:phone}, cb);
  }




}

mongoose.model('User', UserSchema);
