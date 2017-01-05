const { test } = require('ava')
const match = require('../match')

function fakeRequest (url, method = 'GET') {
  return {
    method: method,
    url: url
  }
}

test('* match', (t) => {
  if (!match(fakeRequest('/foo/42'))) {
    t.fail()
  }
})

test('* match with method', (t) => {
  if (!match(fakeRequest('/foo/42', 'OPTIONS'), undefined, 'OPTIONS')) {
    t.fail()
  }
})

test('simple match', (t) => {
  const result = match(fakeRequest('/foo/42'), '/foo/:bar')
  t.is(result.params.bar, '42')
})

test('advanced match', (t) => {
  const result = match(fakeRequest('/foo/42/test/1'), '/foo/:bar/test/:foo')
  t.is(result.params.bar, '42')
  t.is(result.params.foo, '1')
})

test('match with method', (t) => {
  const result = match(fakeRequest('/foo/42/test/1'), '/foo/:bar/test/:foo', 'GET')
  t.is(result.params.bar, '42')
  t.is(result.params.foo, '1')
})

test('match with comma-separated methods', (t) => {
  const result = match(fakeRequest('/foo/42/test/1'), '/foo/:bar/test/:foo', 'OPTIONS,GET')
  t.is(result.params.bar, '42')
  t.is(result.params.foo, '1')
})

test('match with methods', (t) => {
  const result = match(fakeRequest('/foo/42/test/1'), '/foo/:bar/test/:foo', ['OPTIONS', 'GET'])
  t.is(result.params.bar, '42')
  t.is(result.params.foo, '1')
})

test('match with query', (t) => {
  const result = match(fakeRequest('/foo/42/test/1?foo=bar'), '/foo/:bar/test/:foo')
  t.is(result.params.bar, '42')
  t.is(result.params.foo, '1')
  t.is(result.query.foo, 'bar')
})

test('invalid match', (t) => {
  if (match(fakeRequest('/bar/42'), '/foo/:bar')) {
    t.fail()
  }
})
