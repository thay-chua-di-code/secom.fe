import test from 'node:test';
import assert from 'node:assert/strict';
import { formatViewedTime } from '../../src/utils/fncUtils.js';

const NOW = new Date('2026-08-15T10:00:00.000Z').getTime();

const withMockedNow = (run) => {
  const realNow = Date.now;
  Date.now = () => NOW;

  try {
    run();
  } finally {
    Date.now = realNow;
  }
};

test('returns viewed recently for missing value', () => {
  assert.equal(formatViewedTime(null), 'Viewed recently');
});

test('returns viewed recently for invalid value', () => {
  assert.equal(formatViewedTime('not-a-date'), 'Viewed recently');
});

test('formats just now for sub-minute timestamps', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-08-15T09:59:45.000Z'), 'Viewed just now');
  });
});

test('formats minutes correctly', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-08-15T09:30:00.000Z'), 'Viewed 30m ago');
  });
});

test('formats hours correctly', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-08-15T08:00:00.000Z'), 'Viewed 2h ago');
  });
});

test('formats days correctly', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-08-13T10:00:00.000Z'), 'Viewed 2d ago');
  });
});

test('formats weeks correctly', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-08-01T10:00:00.000Z'), 'Viewed 2w ago');
  });
});

test('formats months correctly', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-05-17T10:00:00.000Z'), 'Viewed 3mo ago');
  });
});

test('formats years correctly', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2024-08-15T10:00:00.000Z'), 'Viewed 2y ago');
  });
});

test('future timestamps clamp to just now', () => {
  withMockedNow(() => {
    assert.equal(formatViewedTime('2026-08-15T10:30:00.000Z'), 'Viewed just now');
  });
});
