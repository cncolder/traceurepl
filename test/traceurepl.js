import assert         from 'assert';
import { Traceurepl } from '../lib/traceurepl';


describe('Traceurepl', () => {
  let traceurepl = new Traceurepl();
  
  it('should clean bracket', () => {
    assert.equal(
      traceurepl.cleanBlock(`(let a = 1;
      )`),
      
      `let a = 1;
      `
    );
  });
  
  it('should clean "use strict"', () => {
    assert.equal(
      traceurepl.cleanScript(`
      'use strict';  
      var a = 1;
      `),
      
      `
      var a = 1;
      `
    );
    
    assert.equal(
      traceurepl.cleanScript(`
      "use strict";  
      var a = 1;
      `),
      
      `
      var a = 1;
      `
    );
  });
  
  it('should join errors per line', () => {
    assert.equal(
      traceurepl.error([
        'repl:1:4: Unexpected token ;',
        'repl:1:5: Semi-colon expected',
        'repl:2:1: const variables must have an initializer'
      ]),
      
      '\x1b[1;31mrepl:1:4: Unexpected token ;\nrepl:1:5: Semi-colon expected\nrepl:2:1: const variables must have an initializer\x1b[0m'
    );
  });
});
