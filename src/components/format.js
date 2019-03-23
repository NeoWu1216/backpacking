// helper class
// convert all the data field format
import moment from 'moment'

function abbrev(str, len) {
  return (str.length > len) ? str.substr(0,len)+'...' : str;
}

function date_to_str(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

function newId() {
  return Math.random().toString(36).substr(2, 9)
}

export {abbrev, date_to_str, newId}