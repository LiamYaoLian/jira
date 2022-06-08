import { startServer } from './server'



export const loadServer = (callback: () => void) => {
  startServer();
  if (callback) {
    callback()
  }
}

