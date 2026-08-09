
// api call functions
const getAllProducts = async () => {
  let result = [];

  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => (result = json))
    .catch((err) => console.log(err));

  return result;
};

// =====================================================
// =====================================================
// initial codes
async function initMainPage() {
  const allProducts = await getAllProducts();

  renderProducts(allProducts.slice(0, 4));
}
initMainPage();

function showToast(text) {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
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

// ===========================================================
// ===========================================================
// render functions
function renderProducts(list) {
  const result = list
    .map((item) => {
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
      
            <button
              class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Add to Cart
            </button>
      
          </div>
      
        </div>
      </div>
        `;
    })
    .join("");

  const content = `
      <div class="grid grid-cols-4 gap-2">
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
              class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Add to Cart
            </button>
      
          </div>
      
        </div>
      </div>
        `;
    })
    .join("");

  const content = `
      <div class="grid grid-cols-4 gap-2">
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
      <form onsubmit="handleLoginSubmit" class="space-y-5">

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
          type="submit"
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


// ==================================================
// ==================================================
// router
function router() {
  console.log(location);

  const pathName = location.pathname;

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
    default:
      break;
  }
}
