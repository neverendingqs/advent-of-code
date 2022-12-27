import(`./${process.argv[2]}`)
  .then(({ solution } : { solution: () => Promise<void> }) => solution())
  .catch((err: Error) => {
    console.log(err);
    process.exit(-1);
  });

