/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';

export class Checker extends BasisChecker {
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = node;
      resume(err, val);
    });
  }
}

export class Transformer extends BasisTransformer {
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = {
        type: 'b',
        elts: [`hello, ${v0}!`],
      };
      resume(err, val);
    });
  }

  PROG(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = {
        type: 'p',
        elts: v0,
      };
      resume(err, val);
    });
  }
}

export const compiler = new BasisCompiler({
  langID: '0001',
  version: 'v0.0.1',
  Checker: Checker,
  Transformer: Transformer,
});
