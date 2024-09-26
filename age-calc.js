process.stdin.on('data',(data) =>{
  const year = data.toString().trim();
  if (year == 'exit'){
    process.exit(0);
  }
  try {
    const age = 2024 - year;
    console.log(`${age}`);
  } catch (exception) {
    console.log("enter a valid year");
  }

  process.stdout.write('Enter your birth year: ');
})

process.stdout.write('Enter your birth year: ');