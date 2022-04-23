function evaluate(exp, env, abort, next) {
  if (typeof exp === "number") {
    return next(exp);
  }
  if (typeof exp === "string") {
    if (!env.hasOwnProperty(exp)) {
      return abort(`Unkown variable ${exp}!`);
    }
    return next(env[exp]);
  }
  if (exp.type === "add") {
    return evaluate(exp.exp1, env, abort, function cont1(val1) {
      if (typeof val1 != "number") {
        return abort("add called with a non numeric value");
      }
      return evaluate(exp.exp2, env, abort, function cont2(val2) {
        if (typeof val2 != "number") {
          return abort("add called with a non numeric value");
        }
        return next(val1 + val2);
      });
    });
  }
  if (exp.type === "fun") {
    // notice the function value becomes a CPS itself
    const closure = function (value, abort, next) {
      const funEnv = { ...env, [exp.param]: value };
      return evaluate(exp.body, funEnv, abort, next);
    };
    return next(closure);
  }
  if (exp.type === "call") {
    return evaluate(exp.funExp, env, abort, function cont1(funValue) {
      if (typeof funValue != "function") {
        return abort("trying to call a non function");
      }
      return evaluate(exp.argExp, env, abort, function cont2(argValue) {
        return funValue(argValue, abort, next);
      });
    });
  }
  if (exp.type === "escape") {
    const escapeEnv = { ...env, [exp.eject]: next };
    return evaluate(exp.exp, escapeEnv, abort, next);
  }
}

function fun(param, body) {
  return { type: "fun", param, body };
}

function call(funExp, argExp) {
  return { type: "call", funExp, argExp };
}

function add(exp1, exp2) {
  return { type: "add", exp1, exp2 };
}

function escape(eject, exp) {
  return { type: "escape", eject, exp };
}

function run(program) {
  return evaluate(program, {}, console.error, (x) => x);
}

run(escape("eject", call(fun("x", add("x", "x")), add(3, call("eject", 4)))));
