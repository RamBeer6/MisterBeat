export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  pickRandomColor
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function pickRandomColor() {
  const colors = ['#FFAEBC', '#8585EC', '#A0E7E5', '#B4F8C8', '#FBE7C6', '#E67272', '#ECD282', '#6BC6EE', '#F09574', '#F7EA7B', '#c5f78c', '#ddf0a8'];
  // const colors = ['#27856a', '#8d67ab', '#e8115b', '#1e3264', '#477d95', '#af2896', '#503750', '#6BC6EE', '#148a08', '#ba5d07', '#ffc864', '#e13300', '#509bf5', '#907255', '#f59b23'];

  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}