async function test() {
  //   let result = [];

  //   await fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((json) => (result = json))
  //     .catch((err) => console.log(err));

  //   console.log(result);

  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);

  console.log(3);
}
test();

function double(num) {
  return num * 2;
}

function getNumber(num) {
  return double(num);
}

getNumber(2);
