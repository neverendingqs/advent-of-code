require(`./${process.argv[2]}`)()
  .catch(err => {
    console.log(err);
    process.exit(-1);
  });

