'use strict';

const path = require('path');
const fs = require('fs');
const utils = require('../../utils');

describe('test/lib/plugins/schedule.test.js', () => {
  it('should schedule work', function* () {
    const app = utils.cluster('apps/schedule', {
      workers: 4,
    });
    yield app.ready();
    yield sleep(5000);
    yield app.close();
    const log = getLogContent('schedule');
    contains(log, 'cron').should.within(1, 2);
  });
});

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function getLogContent(name) {
  const logPath = path.join(__dirname, '../../fixtures/apps', name, 'logs', name, `${name}-web.log`);
  return fs.readFileSync(logPath, 'utf8');
}

function contains(content, match) {
  return content.split('\n').filter(line => line.indexOf(match) >= 0).length;
}
