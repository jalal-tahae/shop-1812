const getAllProducts = async () => {
  let result = [];

  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => (result = json))
    .catch((err) => console.log(err));

  return result;
};

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

  document.getElementById("root").innerHTML = result;
}

function handleAClick(event) {
  event.preventDefault();

  const target = event.currentTarget;
  const href = target.getAttribute("href");

  history.pushState({}, "", href);

  renderAllProductsPage();
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

  document.getElementById("root").innerHTML = result;
}
