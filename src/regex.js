const regex=/^\/products\/(\d+)$/;
const url="/products/123";
const match = url.match(regex);
if (match){
    const id = match[1];
    console.log(id);
}



function handleEditProductForm(event) {
  // console.log("function call");
  event.preventDefault();
  const form = event.currentTarget;

  const formData = new FormData(form);

  const id = formData.get("id");
  console.log("editing product id:", id);
  const title = formData.get("title");
  const desc = formData.get("desc");
  const price = formData.get("price");

  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      price,
      description: desc,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.id) {
        showToast("product updated successfully!");
      }
      document.getElementById("edit-modal").remove();
    });
}

<button onclick="handleEditProduct('${product.id}')" class="bg-yellow-500 py-1 px-2 text-white rounded-md">edit</button>


async function handleAddProduct(id) {
  const productData = await getSingleProduct(id);

  console.log(productData);

  const root = document.getElementById("root");

  const modal = `
    <div id="edit-modal" class="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center">
      <div class="max-h-[calc(100vh-200px)] overflow-y-auto bg-white rounded-lg px-10 py-12">
        <form onsubmit="handleEditProductForm(event)" class="space-y-2">
          <input type="hidden" value="${id}" name="id" />
          <div>
            <lable>title:</lable>
            <input class="border px-2 py-1" name="title" type="text" value="${
              productData.title
            }" />
          </div>

          <div>
            <lable>description:</lable>
            <input class="border px-2 py-1" name="desc" type="text" value="${
              productData.description
            }" />
          </div>

          <div>
            <lable>price:</lable>
            <input class="border px-2 py-1" name="price" type="number" value="${+productData.price}" />
          </div>

          <input type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2" value="update" >

        </form>
      </div>
    </div>
  `;

  root.innerHTML += modal;
}


async function handleEditProduct(id) {
  const productData = await getSingleProduct(id);

  console.log(productData);

  const root = document.getElementById("root");

  const modal = `
    <div id="edit-modal" class="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center">
      <div class="max-h-[calc(100vh-200px)] overflow-y-auto bg-white rounded-lg px-10 py-12">
        <form onsubmit="handleEditProductForm(event)" class="space-y-2">
          <input type="hidden" value="${id}" name="id" />
          <div>
            <lable>title:</lable>
            <input class="border px-2 py-1" name="title" type="text" value="${
              productData.title
            }" />
          </div>

          <div>
            <lable>description:</lable>
            <input class="border px-2 py-1" name="desc" type="text" value="${
              productData.description
            }" />
          </div>

          <div>
            <lable>price:</lable>
            <input class="border px-2 py-1" name="price" type="number" value="${+productData.price}" />
          </div>

          <input type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2" value="update" >

        </form>
      </div>
    </div>
  `;

  root.innerHTML += modal;
}




const product = { title: 'New Product', price: 29.99 };
fetch('https://fakestoreapi.com/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(product)
})
  .then(response => response.json())
  .then(data => console.log(data));