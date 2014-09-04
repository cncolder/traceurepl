import repl    from 'repl';
import util    from 'util';
import traceur from 'traceur';


class Traceurepl {
  eval(block, context, filename, callback) {
    try {
      let compiled = this.compile(block, filename);
      
      if (compiled.errors) {
        return callback(this.error(compiled.errors));
      }
      else {
        let js = compiled.js ? compiled.js : compiled;
        js = this.cleanScript(js);
        
        this.printCompiledScript(js);
        
        this.nodeEval(js, context, filename, callback);
      }
    } catch (ex) {
      callback(this.error(ex));
    }
  }
  
  compile(block, filename) {
    return traceur.compile(this.cleanBlock(block), {
      filename: filename,
      experimental: true
    });
  }
  
  printCompiledScript(script) {
    util.print(this.colorfulScript(script));
  }
  
  cleanBlock(block) {
    return block.replace(/^\(|\)$/g, '');
  }
  
  cleanScript(script) {
    return script.replace(/('|")use strict('|");\s*/g, '');
  }
  
  colorfulScript(script) {
    return `\x1b[4m${script}\x1b[0m`;
  }
  
  error(err) {
    if (util.isArray(err)) {
      err = err.join('\n');
    }
    
    return `\x1b[1;31m${err}\x1b[0m`;
  }
  
  start() {
    let nodeRli = repl.start({
      prompt: 'T>',
      ignoreUndefined: true
    });
    
    this.nodeEval = nodeRli.eval;
    nodeRli.eval = this.eval.bind(this);
  }
}


export { Traceurepl };
