import { expect } from 'chai';

import AppError from '../src/index';

process.env.SERVICE_NAME = 'TEST';
describe('AppError', () => {
  describe('Create an AppError', () => {
    describe('Given code and message', () => {
      it('should create AppError with correct properties', () => {
        const error = new AppError('TEST_ERROR', 'Test error');

        expect(error.service).to.be.equal('TEST');
        expect(error.code).to.equal('TEST_ERROR');
        expect(error.message).to.equal('Test error');
      });
    });
  });

  describe('#toJSON', () => {
    describe('Given an AppError without meta', () => {
      it('should return an object with name, code, message, stack and service properties', () => {
        const error = new AppError('TEST_ERROR', 'Test error');

        expect(error.toJSON()).to.has.all.keys(['id', 'name', 'code', 'message', 'stack', 'service']);
      });
    });

    describe('Given a meta parameter', () => {
      it('should include meta properties', () => {
        const error = new AppError('TEST_ERROR', 'Test error', { one: 1, two: 2 });

        expect(error.toJSON()).to.has.all.keys(['id', 'name', 'code', 'message', 'stack', 'service', 'one', 'two']);
      });
    });
  });
});
