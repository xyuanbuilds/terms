const generator = (func) => {
  let resumeGenerator;

  const yield = (yielded) => {
    return shift((cont) => {
      resumeGenerator = cont;
      return yielded;
    });
  };

  resumeGenerator = () => {
    return func(yield);
  };

  const next = (sent) => {
    return reset(resumeGenerator(sent));
  };

  return { next };
};

var gen = generator((yield) => {
  const sent = yield(1);
  console.log(sent);
});

const yielded = gen.next(2);
console.log(yielded);
gen.next();
