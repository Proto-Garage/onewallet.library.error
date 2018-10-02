import { expect } from 'chai';

import AppError from '../src/index';

describe('AppError', () => {
  describe('Given no meta data', () => {
    it('should create error', () => {
      const error = new AppError('TEST_ERROR', 'Test error');

      expect(error.meta).to.be.undefined;
      expect(error.toJSON()).to.deep.equal({ code: 'TEST_ERROR', message: 'Test error' });
      expect(error.name).to.equal('AppError');
      expect(error.code).to.equal('TEST_ERROR');
      expect(error.message).to.equal('Test error');
    });
  });

  describe('Given a meta data', () => {
    it('should create error', () => {
      const error = new AppError('TEST_ERROR', 'Test error', { one: 1 });
      expect(error.meta).to.deep.equal({ one: 1 });
      expect(error.toJSON()).to.deep.equal({ code: 'TEST_ERROR', message: 'Test error', one: 1 });
      expect(error.name).to.equal('AppError');
      expect(error.code).to.equal('TEST_ERROR');
      expect(error.message).to.equal('Test error');
    });
  });
});
