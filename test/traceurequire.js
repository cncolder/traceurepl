import fs from 'fs';
import path from 'path';
import os from 'os';
import assert from 'assert';


describe('traceurequire', () => {
  let tmp = os.tmpdir();
  let node_modules = path.join(tmp, 'node_modules');
  let skip = path.join(node_modules, 'skip.js');
  let traceurepl = path.join(node_modules, 'traceurepl.js');
  
  before( () => {
    if (!fs.existsSync(node_modules)) {
      fs.mkdirSync(node_modules);
    }
    fs.writeFileSync(skip, 'let a;');
    fs.writeFileSync(traceurepl, 'let a;');
  });
  
  after ( () => {
    fs.unlinkSync(skip);
    fs.unlinkSync(traceurepl);
    fs.rmdirSync(node_modules);
  });
  
  it('should skip files in node_modules', () => {
    assert.throws(() => require(skip), SyntaxError);
  });
  
  it('should require file with name "traceurepl" in node_modules', () => {
    assert.doesNotThrow(() => require(traceurepl));
  });
});
