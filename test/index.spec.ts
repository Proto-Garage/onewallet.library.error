import { expect } from 'chai';
import R from 'ramda';
import { v4 as uuid } from 'uuid';

import { AppError } from '../src/index';

describe('AppError', () => {
  process.env.SERVICE_NAME = 'TEST';

  describe('Create an AppError', () => {
    describe('Given code and message', () => {
      it('should create AppError with correct properties', () => {
        const error = new AppError('TEST_ERROR', 'Test error');

        expect(error.service).to.be.equal('TEST');
        expect(error.code).to.equal('TEST_ERROR');
        expect(error.message).to.equal('Test error');
        expect(R.omit(['stack'])(error.toJSON())).to.deep.equal({ code: 'TEST_ERROR', message: 'Test error', service: 'TEST' });
      });
    });

    describe('Given meta', () => {
      it('should include meta properties in error object', () => {
        const account = uuid();
        const error = new AppError('TEST_ERROR', 'Test error', { account });

        expect(error.service).to.be.equal('TEST');
        expect(error.code).to.equal('TEST_ERROR');
        expect(error.message).to.equal('Test error');
        expect(R.omit(['stack'])(error.toJSON())).to.deep.equal({
          code: 'TEST_ERROR',
          message: 'Test error',
          service: 'TEST',
          account,
        });
      });
    });
  });

  describe('Create an AppError from serialized error object', () => {
    describe('Given a valid error object', () => {
      it('should create AppError with correct properties', () => {
        const originalError = new AppError('TEST_ERROR', 'Test error');

        const derivedError = AppError.fromJSON(originalError.toJSON());

        expect(derivedError.toJSON()).to.deep.equal(originalError.toJSON());
      });
    });
  });
});
