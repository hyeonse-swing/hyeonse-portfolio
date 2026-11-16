import { createRequire } from 'node:module';
import Module from 'node:module';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const require = createRequire(import.meta.url);

/** Load the build-time TS reader in Node checks without a separate runtime dependency. */
export function loadNotesModule() {
  const previousTs = require.extensions['.ts'];
  const previousLoad = Module._load;
  require.extensions['.ts'] = (module, filename) => {
    const source = readFileSync(filename, 'utf8');
    const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
    module._compile(output.outputText, filename);
  };
  Module._load = function (request, parent, isMain) {
    if (request === 'server-only') return {};
    return previousLoad.call(this, request, parent, isMain);
  };
  try {
    return require('../src/lib/notes.ts');
  } finally {
    if (previousTs) require.extensions['.ts'] = previousTs;
    else delete require.extensions['.ts'];
    Module._load = previousLoad;
  }
}
