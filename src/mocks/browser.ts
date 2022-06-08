import {setupWorker} from 'msw';
import {handlers} from './handlers';
// import {handlers} from './server/handlers/index'

// @ts-ignore
export const worker = setupWorker(...handlers);