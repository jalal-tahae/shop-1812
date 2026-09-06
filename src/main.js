let editingProductData;

const authContainer = document.getElementById("auth-container");

const token = localStorage.getItem("token");

if (token) {
  authContainer.innerHTML = `
    <a class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600" href="/admin-dashboard" onclick="handleAClick(event)">
      مشاهده داشبورد
    </a>
  `;
}

// api call functions
var getAllProducts = async () => {
  let result = [];
  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => (result = json))
    .catch((err) => console.log(err));

  return result;
};

const getSingleProduct = async (id) => {
  return await fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
    res.json()
  );
};

function handleDeleteProduct(productId) {
  const token = localStorage.getItem("token");

  fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.id) showToast("product deleted successfully");
      router();
    });
}

async function handleEditProduct(id) {
  // const productData = await getSingleProduct(id);

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

async function handleAddProduct(event) {
  debugger;
  // console.log(productData);

  const root = document.getElementById("root");

  const modal = `
    <div id="add-modal" class="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center">
      <div class="max-h-[calc(100vh-200px)] overflow-y-auto bg-white rounded-lg px-10 py-12">
        <form onsubmit="handleAddProductForm(event)" class="space-y-2">
        
          <div>
            <lable>title:</lable>
            <input class="border px-2 py-1" name="title" type="text" />
          </div>

          <div>
            <lable>description:</lable>
            <input class="border px-2 py-1" name="desc" type="text" />
          </div>

          <div>
            <lable>price:</lable>
            <input class="border px-2 py-1" name="price" type="number" />
          </div>

          <input type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2" value="Add" >

        </form>
      </div>
    </div>
  `;

  root.innerHTML += modal;
}

function handleAddProductForm(event) {
  debugger;
  event.preventDefault();
  const form = event.currentTarget;

  const formData = new FormData(form);

  const title = formData.get("title");
  const desc = formData.get("desc");
  const price = formData.get("price");

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      price,
      description: desc,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.id) {
        showToast("product Added successfully!");
      }
      document.getElementById("add-modal").remove();
    });
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

// =====================================================
// =====================================================
// initial codes
async function initMainPage() {
  const allProducts = await getAllProducts();

  renderProducts(allProducts.slice(0, 4));
}
initMainPage();

function showToast(text, background) {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: background || "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function handleAClick(event) {
  event.preventDefault();

  const target = event.currentTarget;
  const href = target.getAttribute("href");

  history.pushState({}, "", href);

  router();
}

const addToCart = (productId) => {
  console.log(productId);

  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    // const foundItem = cart.find((item) => item.id == productId);
    // if (foundItem) {
    //   foundItem.quantity++;
    // } else {
    //   cart.push({
    //     id: productId,
    //     quantity: 1,
    //   });
    // }

    const foundIndex = cart.findIndex((item) => item.id == productId);
    if (foundIndex !== -1) {
      cart[foundIndex].quantity++;
    } else {
      cart.push({
        id: productId,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const newCart = [
      {
        id: productId,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  router();
};

const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    const foundIndex = cart.findIndex((item) => item.id == productId);
    if (foundIndex !== -1) {
      if (cart[foundIndex].quantity > 1) {
        cart[foundIndex].quantity--;
      } else {
        cart.splice(foundIndex, 1);
      }
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  router();
};

// ===========================================================
// ===========================================================
// render functions
function renderProducts(list) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const result = list
    .map((item) => {
      const foundItem = cart?.find((cartItem) => item.id == cartItem.id);

      return `
        <div class="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

        <!-- Product Image -->
        <div class="flex h-72 items-center justify-center bg-gray-50 p-6">
          <img
            src="${item.image}"
            alt="${item.title}"
            class="max-h-full object-contain"
          />
        </div>
      
        <!-- Content -->
        <div class="space-y-4 p-6">
      
          <!-- Category -->
          <span class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            ${item.category}
          </span>
      
          <!-- Title -->
          <h2 class="line-clamp-2 text-lg font-bold text-gray-900">
            ${item.title}
          </h2>
      
          <!-- Description -->
          <p class="line-clamp-3 text-sm text-gray-600">
            ${item.description}
          </p>
      
          <!-- Rating -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">
                ${item.rating.rate}
              </span>
      
              <span class="text-sm text-gray-500">
                (${item.rating.count})
              </span>
            </div>
          </div>
      
          <!-- Price + Button -->
          <div class="flex items-center justify-between pt-2">
      
            <div>
              <p class="text-2xl font-bold text-gray-900">
                $${item.price}
              </p>
            </div>
      
            ${
              foundItem
                ? `
                <div class="flex gap-2">
                  <button class="px-2 py-1 rounded-md bg-red-500 text-white"
                  onclick="removeFromCart('${item.id}')">-</button>
                  <span>${foundItem.quantity}</span>
                  <button class="px-2 py-1 rounded-md bg-blue-500 text-white" onclick="addToCart('${item.id}')">+</button>
                </div>`
                : `<button
            onclick="addToCart('${item.id}')"
            class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add to Cart
          </button>`
            }
            
      
          </div>
      
        </div>
      </div>
        `;
    })
    .join("");

  const content = `
      <div class="grid lg:grid-cols-4 gap-2 sm:grid-cols-2">
        ${result}
      </div>
    `;

  document.getElementById("root").innerHTML = content;
}

async function renderCartPage() {
  const allProducts = await getAllProducts();
  const cart = (JSON.parse(localStorage.getItem("cart")) ?? []).map(
    (item) => item.id
  );

  const cartData = [];

  allProducts.forEach((productItem) => {
    const foundItem = cart.find((cart) => cart.id == productItem.id);
    // if (cart.includes(String(productItem.id))) {
    //   cartData.push(productItem);
    // }

    if (foundItem) cartData.push(productItem);
  });

  const result = cartData
    .map((item) => {
      return `
    <a href="/products/${item.id}" onclick="handleAClick(event)">
      <div class="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <!-- Product Image -->
      <div class="flex h-72 items-center justify-center bg-gray-50 p-6">
        <img
          src="${item.image}"
          alt="${item.title}"
          class="max-h-full object-contain"
        />
      </div>
    
      <!-- Content -->
      <div class="space-y-4 p-6">
    
        <!-- Category -->
        <span class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          ${item.category}
        </span>
    
        <!-- Title -->
        <h2 class="line-clamp-2 text-lg font-bold text-gray-900">
          ${item.title}
        </h2>
    
        <!-- Description -->
        <p class="line-clamp-3 text-sm text-gray-600">
          ${item.description}
        </p>
    
        <!-- Rating -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-700">
              ${item.rating.rate}
            </span>
    
            <span class="text-sm text-gray-500">
              (${item.rating.count})
            </span>
          </div>
        </div>
    
        <!-- Price + Button -->
        <div class="flex items-center justify-between pt-2">
    
          <div>
            <p class="text-2xl font-bold text-gray-900">
              $${item.price}
            </p>
          </div>
    
          <button
          onclick="addToCart('${item.id}')"
            class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add to Cart
          </button>
    
        </div>
    
      </div>
    </div>
    </a>  
    `;
    })
    .join("");

  const content = `
      <div class="grid lg:grid-cols-4 gap-2 sm:grid-cols-2">
        ${result}
      </div>
  `;

  document.getElementById("root").innerHTML = content;
}

async function renderAllProductsPage() {
  const allProducts = await getAllProducts();

  const result = allProducts
    .map((item) => {
      return `
      <a href="/products/${item.id}" onclick="handleAClick(event)">
        <div class="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

        <!-- Product Image -->
        <div class="flex h-72 items-center justify-center bg-gray-50 p-6">
          <img
            src="${item.image}"
            alt="${item.title}"
            class="max-h-full object-contain"
          />
        </div>
      
        <!-- Content -->
        <div class="space-y-4 p-6">
      
          <!-- Category -->
          <span class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            ${item.category}
          </span>
      
          <!-- Title -->
          <h2 class="line-clamp-2 text-lg font-bold text-gray-900">
            ${item.title}
          </h2>
      
          <!-- Description -->
          <p class="line-clamp-3 text-sm text-gray-600">
            ${item.description}
          </p>
      
          <!-- Rating -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">
                ${item.rating.rate}
              </span>
      
              <span class="text-sm text-gray-500">
                (${item.rating.count})
              </span>
            </div>
          </div>
      
          <!-- Price + Button -->
          <div class="flex items-center justify-between pt-2">
      
            <div>
              <p class="text-2xl font-bold text-gray-900">
                $${item.price}
              </p>
            </div>
      
            <button
            onclick="addToCart('${item.id}')"
              class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Add to Cart
            </button>
      
          </div>
      
        </div>
      </div>
      </a>  
      `;
    })
    .join("");

  const content = `
      <div class="grid lg:grid-cols-4 gap-2 sm:grid-cols-2">
        ${result}
      </div>
    `;

  document.getElementById("root").innerHTML = content;
}

function renderAboutPage() {
  const content = `
    <div>
      ABOUT US PAGE
    </div>
  `;
  document.getElementById("root").innerHTML = content;
}

function renderLoginPage() {
  const token = localStorage.getItem("token");

  if (token) {
    renderAdminDashboard();
    return;
  }

  debugger;
  const content = `
  <div class="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 py-12">

  <div class="w-full max-w-md">

    <!-- Login Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">

      <!-- Title -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">
          ورود به حساب کاربری
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          برای ورود، اطلاعات خود را وارد کنید
        </p>
      </div>


      <!-- Form -->
      <form onsubmit="handleLoginSubmit(event)" class="space-y-5" id="loginForm">

        <!-- Username -->
        <div>
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            نام کاربری
          </label>

          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            placeholder="نام کاربری خود را وارد کنید"
            required
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>


        <!-- Password -->
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            رمز عبور
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            placeholder="رمز عبور خود را وارد کنید"
            required
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>


        <!-- Submit -->
        <button
          
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:bg-blue-800"
        >
          ورود
        </button>

      </form>

    </div>

  </div>

</div>
  `;

  document.getElementById("root").innerHTML = content;
}

async function renderAdminDashboard() {
  const allProducts = await getAllProducts();

  // const rows = allProducts
  //   .map((product) => {
  //     return `
  //     <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
  //       <td class="px-6 py-4">
  //         <img
  //           src="${product.image}"
  //           class="w-16 h-16 object-cover rounded-lg border border-gray-200"
  //         />
  //       </td>
  //       <td class="px-6 py-4 text-sm font-medium text-gray-900">
  //         ${product.title}
  //       </td>
  //       <td class="px-6 py-4 text-sm font-semibold text-gray-700">
  //         ${product.price}
  //       </td>
  //       <td class="px-6 py-4">
  //         <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
  //           ${product.category}
  //         </span>
  //       </td>
  //       <td class="px-6 py-4">
  //         <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
  //           <button>delete</button>
  //           <button>edit</button>
  //         </span>
  //       </td>

  //     </tr>
  //   `;
  //   })
  //   .join("");

  content = `
  <div class="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
    <table class="w-full min-w-175 text-left">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            image
          </th>
          <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            title
          </th>
          <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            price
          </th>
          <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            category
          </th>
          <th>
            actions
          </th>
          <th>
            <button onclick="handleAddProduct(event)" class="bg-blue-500 py-1 px-2 text-white rounded-md">
              Add
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-100">
        ${allProducts
          .map((product) => {
            return `
          <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <img
              src="${product.image}"
              class="w-16 h-16 object-cover rounded-lg border border-gray-200"
            />
          </td>
          <td class="px-6 py-4 text-sm font-medium text-gray-900">
            ${product.title}
          </td>
          <td class="px-6 py-4 text-sm font-semibold text-gray-700">
            ${product.price}
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              ${product.category}
            </span>
          </td>
          <td class="flex gap-2 justify-between h-full px-6 py-4 text-sm font-semibold text-gray-700">
              <button onclick="handleDeleteProduct('${product.id}')" class="bg-red-500 py-1 px-2 text-white rounded-md">delete</button>
              <button onclick="handleEditProduct('${product.id}')" class="bg-yellow-500 py-1 px-2 text-white rounded-md">edit</button>
          </td>
          
        </tr>
          `;
          })
          .join("")}
      </tbody>
    </table>
  </div>
`;

  document.getElementById("root").innerHTML = content;
}

// ==================================================
// ==================================================
// router
function router() {
  debugger;
  const pathName = location.pathname;
  console.log(pathName);

  // regex
  //////////////////////
  const regex = /^\/products\/(\d+)$/;
  const url = pathName;
  console.log(url);
  const match = url.match(regex);
  if (match) {
    const id = match[1];
    console.log(id);
    productrender(id);
  }
  ///////////////////////////

  switch (pathName) {
    case "/products":
      renderAllProductsPage();
      break;
    case "/about":
      renderAboutPage();
      break;
    case "/login":
      renderLoginPage();
      break;
    case "/admin-dashboard":
      renderAdminDashboard();
      break;
    case "/src/index.html":
      initMainPage();
      break;
    case "/cart":
      renderCartPage();
      break;

    default:
      break;
  }
}
//=====================================================login

function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");

  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => {
      const contentType = res.headers.get("Content-Type");
      console.log("content type:", contentType);
      if (contentType === "text/html; charset=utf-8") {
        throw new Error("username or password is incorrect");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        history.pushState({}, "", "/admin-dashboard");
        router();
      }
    })
    .catch((err) => showToast(err, "rgb(255,0,0)"));
}

window.addEventListener("popstate", () => {
  router();
});

function productDetail(event, address) {
  event.preventDefault();
  console.log(event, address);
}

async function productrender(id) {
  debugger;
  const product = await getSingleProduct(id);

  console.log("product details:", product);

  const result = `
      <div>
        <div class="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

        <!-- Product Image -->
        <div class="flex h-72 items-center justify-center bg-gray-50 p-6">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="max-h-full object-contain"
          />
        </div>
      
        <!-- Content -->
        <div class="space-y-4 p-6">
      
          <!-- Category -->
          <span class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            ${product.category}
          </span>
      
          <!-- Title -->
          <h2 class="line-clamp-2 text-lg font-bold text-gray-900">
            ${product.title}
          </h2>
      
          <!-- Description -->
          <p class="line-clamp-3 text-sm text-gray-600">
            ${product.description}
          </p>
      
          <!-- Rating -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">
                ${product.rating.rate}
              </span>
      
              <span class="text-sm text-gray-500">
                (${product.rating.count})
              </span>
            </div>
          </div>
      
          <!-- Price + Button -->
          <div class="flex items-center justify-between pt-2">
      
            <div>
              <p class="text-2xl font-bold text-gray-900">
                $${product.price}
              </p>
            </div>
      
            <button
            onclick="addToCart('${item.id}')"
              class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Add to Cart
            </button>
      
          </div>
      
        </div>
      </div>
      </div>  
      `;

  const content = `
      <div class="grid lg:grid-cols-4 gap-2 sm:grid-cols-2">
        ${result}
      </div>
    `;

  document.getElementById("root").innerHTML = content;
}
