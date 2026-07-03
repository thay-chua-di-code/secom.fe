import { expect, test } from '@playwright/test';

const cartItem = {
  cartItemId: 'cart-item-1',
  productId: 1,
  productName: 'MacBook Pro M4',
  quantity: 1,
  unitPrice: 45990000,
  subtotal: 45990000,
};

const address = {
  id: 'address-1',
  receiverName: 'Test User',
  phoneNumber: '0909000000',
  province: 'Ho Chi Minh',
  district: 'District 1',
  ward: 'Ben Nghe',
  detailAddress: '1 Nguyen Hue',
  isDefault: true,
};

async function loginAsBuyer(page) {
  await page.addInitScript(() => {
    localStorage.setItem('token', 'e2e-token');
  });
}

async function mockCommonApis(page) {
  let cartItems = [];
  let wishlistItems = [];
  let addresses = [];

  await page.route('**/api/profile', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        json: {
          success: true,
          data: {
            id: 'buyer-1',
            fullName: 'E2E Buyer',
            name: 'E2E Buyer',
            email: 'buyer@example.com',
            avatarUrl: null,
          },
        },
      });
      return;
    }

    await route.fulfill({ json: { success: true, data: {} } });
  });

  await page.route('**/api/cart', async (route) => {
    await route.fulfill({
      json: {
        success: true,
        data: {
          items: cartItems,
          subtotal: cartItems.reduce((sum, item) => sum + item.subtotal, 0),
          finalTotal: cartItems.reduce((sum, item) => sum + item.subtotal, 0),
        },
      },
    });
  });

  await page.route('**/api/cart/items', async (route) => {
    cartItems = [cartItem];
    await route.fulfill({
      json: {
        success: true,
        data: {
          items: cartItems,
          subtotal: cartItem.subtotal,
          finalTotal: cartItem.subtotal,
        },
      },
    });
  });

  await page.route('**/api/cart/items/*', async (route) => {
    if (route.request().method() === 'PUT') {
      const body = route.request().postDataJSON();
      cartItems = cartItems.map((item) =>
        item.cartItemId === 'cart-item-1'
          ? { ...item, quantity: body.quantity, subtotal: item.unitPrice * body.quantity }
          : item,
      );
      await route.fulfill({ json: { success: true, data: { items: cartItems } } });
      return;
    }

    if (route.request().method() === 'DELETE') {
      cartItems = [];
      await route.fulfill({ json: { success: true, data: { items: [] } } });
      return;
    }

    await route.fallback();
  });

  await page.route('**/api/wishlist**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: { success: true, data: { items: wishlistItems } } });
      return;
    }

    await route.fallback();
  });

  await page.route('**/api/wishlist/*', async (route) => {
    if (route.request().method() === 'POST') {
      wishlistItems = [
        {
          productId: 1,
          product: {
            id: 1,
            name: 'MacBook Pro M4',
            price: 45990000,
            stock: 5,
            images: ['https://example.com/macbook.png'],
          },
        },
      ];
      await route.fulfill({ json: { success: true, data: wishlistItems[0] } });
      return;
    }

    if (route.request().method() === 'DELETE') {
      wishlistItems = [];
      await route.fulfill({ json: { success: true, data: null } });
      return;
    }

    await route.fallback();
  });

  await page.route('**/api/addresses', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: { success: true, data: addresses } });
      return;
    }

    if (route.request().method() === 'POST') {
      addresses = [address];
      await route.fulfill({ json: { success: true, data: address } });
      return;
    }

    await route.fallback();
  });

  await page.route('**/api/categories', async (route) => {
    await route.fulfill({
      json: {
        success: true,
        data: [
          { id: 'Laptop', name: 'Laptop' },
          { id: 'Keyboard', name: 'Keyboard' },
        ],
      },
    });
  });

  await page.route('**/api/discovery/homepage', async (route) => {
    await route.fulfill({
      json: {
        success: true,
        data: {
          banners: [],
          featuredCategories: [],
          featuredProducts: [],
          latestProducts: [],
        },
      },
    });
  });
}

test.describe('Product listing, cart, wishlist and buyer profile', () => {
  test('product listing supports search, price filter, category filter and action buttons', async ({ page }) => {
    await page.goto('/products');

    expect(await page.getByTestId('product-card').count()).toBeGreaterThan(0);
    await expect(page.getByTestId('add-to-cart-btn').first()).toBeVisible();
    await expect(page.getByTestId('wishlist-btn').first()).toBeVisible();
    await expect(page.getByTestId('buy-now-btn').first()).toBeVisible();

    await page.getByTestId('product-search-input').fill('MacBook');
    await expect(page.getByTestId('product-card').first()).toContainText('MacBook');

    await page.getByTestId('price-max-input').fill('1000');
    await expect(page.getByTestId('product-empty-state')).toBeVisible();

    await page.getByTestId('price-max-input').fill('');
    await page.getByTestId('category-filter').getByLabel('Laptop').check();
    await expect(page.getByTestId('product-empty-state').or(page.getByTestId('product-card').first())).toBeVisible();
  });

  test('cart add, quantity update and remove work', async ({ page }) => {
    await loginAsBuyer(page);
    await mockCommonApis(page);

    await page.goto('/products');
    await page.getByTestId('add-to-cart-btn').first().click();

    await page.goto('/cart');
    await expect(page.getByTestId('cart-item')).toContainText('MacBook Pro M4');

    await page.getByTestId('quantity-increase-btn').click();
    await expect(page.getByTestId('cart-item')).toContainText('Qty: 2');

    await page.getByTestId('quantity-decrease-btn').click();
    await expect(page.getByTestId('cart-item')).toContainText('Qty: 1');

    await page.getByTestId('remove-cart-item-btn').click();
    await expect(page.getByTestId('cart-item')).toHaveCount(0);
  });

  test('wishlist add, display and remove work', async ({ page }) => {
    await loginAsBuyer(page);
    await mockCommonApis(page);

    await page.goto('/products');
    await page.getByTestId('wishlist-btn').first().click();

    await page.goto('/wish-list');
    await expect(page.getByTestId('product-card')).toContainText('MacBook Pro M4');

    await page.getByTestId('remove-wishlist-btn').click();
    await expect(page.getByTestId('product-card')).toHaveCount(0);
  });

  test('product detail shows content and interaction buttons', async ({ page }) => {
    await page.goto('/product-detail/1');

    await expect(page.getByTestId('product-detail-image')).toBeVisible();
    await expect(page.getByTestId('product-detail-name')).toBeVisible();
    await expect(page.getByTestId('product-detail-price')).toBeVisible();
    await expect(page.getByTestId('product-detail-description')).toBeVisible();
    await expect(page.getByTestId('add-to-cart-btn')).toBeVisible();
    await expect(page.getByTestId('wishlist-btn')).toBeVisible();
    await expect(page.getByTestId('buy-now-btn')).toBeVisible();
  });

  test('home category click updates products URL and handles empty state', async ({ page }) => {
    await mockCommonApis(page);

    await page.goto('/');
    await page.getByTestId('category-filter').first().click();

    await expect(page).toHaveURL(/\/products\?category=/);
    await expect(page.getByTestId('product-empty-state').or(page.getByTestId('product-card').first())).toBeVisible();
  });

  test('profile address add flow validates required fields and displays new address', async ({ page }) => {
    await loginAsBuyer(page);
    await mockCommonApis(page);

    await page.goto('/profile');
    await page.getByRole('button', { name: /address/i }).click();
    await expect(page.getByTestId('profile-address-section')).toBeVisible();

    await page.getByTestId('add-address-btn').first().click();
    await page.getByTestId('address-save-btn').click();
    await expect(page.getByTestId('address-form')).toBeVisible();

    await page.getByTestId('address-receiver-input').fill(address.receiverName);
    await page.getByTestId('address-phone-input').fill(address.phoneNumber);
    await page.getByTestId('address-province-input').fill(address.province);
    await page.getByTestId('address-district-input').fill(address.district);
    await page.getByTestId('address-ward-input').fill(address.ward);
    await page.getByTestId('address-detail-input').fill(address.detailAddress);
    await page.getByTestId('address-save-btn').click();

    await expect(page.getByText(address.receiverName)).toBeVisible();
  });

  test('unauthenticated add cart redirects to login and API failure shows error instead of crashing', async ({ page }) => {
    await page.goto('/products');
    await page.getByTestId('add-to-cart-btn').first().click();
    await expect(page).toHaveURL(/\/login/);

    await loginAsBuyer(page);
    await page.route('**/api/cart', async (route) => {
      await route.fulfill({ status: 500, json: { success: false, message: 'Cart API failed' } });
    });

    await page.goto('/cart');
    await expect(page.getByText(/Cart API failed|Failed to fetch cart/i)).toBeVisible();
  });
});
