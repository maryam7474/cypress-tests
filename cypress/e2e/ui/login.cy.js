describe('Authentication', () => {
it('Valid user login', () => {

    cy.visit('http://localhost:5173/auth/login')

    cy.get('input[type="email"]')
      .type('customer@automationcamp.org')

    cy.get('input[type="password"]')
      .type('welcome01')
      cy.wait(2000)
      
    cy.get('[data-testid="login-submit"]').click()

    // بررسی تغییر آدرس
    cy.url({ timeout: 10000 }).should('include', '/')

    // بررسی نمایش منوی کاربر
    cy.get('class="min-h-screen flex flex-col"').should('be.visible')
  })
 })

it('testcase 2',() => {
  cy.visit('http://localhost:5173/auth/login')

  cy.get('input[type="email"]')
      .type('customer@automationcamp.org')

  cy.get('input[type="password"]')
      .type('wrongPassword123')
      cy.wait(2000)
  
   cy.get('[data-testid="login-submit"]').click()

 })

it('testcase 3',() => {

 cy.visit('/auth/register')

 cy.get('[data-testid="first-name"]').type('Maryam')
    cy.get('[data-testid="last-name"]').type('Sharifpour')

    cy.get('[data-testid="email"]').type(`maryam${Date.now()}@test.com`)

    cy.get('[data-testid="password"]').type('Test@12345')
    cy.get('[data-testid="password-confirm"]').type('Test@12345')

    cy.get('[data-testid="phone"]').type('09123456789')

    cy.get('[data-testid="dob"]').type('1995-01-01')

    cy.get('[data-testid="register-submit"]').click()

    // بررسی لاگین خودکار و انتقال به پروفایل
    cy.url().should('include', '/account/profile')

  })

it('testcase 4', () => {

    cy.visit('/')

 cy.get('[data-testid="product-grid"]').should('be.visible')
 cy.get('[data-testid="product-card"]').should('have.length.at.least', 9)
 cy.get('[data-testid="product-name"]').should('exist')
 cy.get('[data-testid="product-price"]').should('exist')

  })

it('testcase 5', () => {

 cy.visit('/')

    cy.get('[data-testid="search-query"]')
  .type('hammer{enter}')

    cy.get('[data-testid="search-query"]')
      .click()

    cy.get('[data-testid="product-name"]')
      .should('contain.text', 'Hammer')

 })

it('testcase 6', () => {

 cy.visit('/')

    // انتخاب فیلتر Power Tools
    cy.get('[data-testid="category-power-tools"]')
      .click()

    cy.get('[data-testid="product-card"]')
  .should('have.length.greaterThan', 0)
 })


it('testcase 7', () => {

 cy.visit('/')
 cy.intercept('GET', '**/products*').as('getProducts')
 cy.get('[data-testid="sort-select"]')
  .select('price-asc')
  cy.wait('@getProducts')

 cy.get('[data-testid="product-price"]')
  .then(($prices) => {

    const prices = [...$prices].map(price =>
      Number(price.innerText.replace('$', ''))
    )

    const sortedPrices = [...prices].sort((a, b) => a - b)
     
    expect(prices).to.deep.equal(sortedPrices)

    })
    })

it('testcase 8', () => {

 cy.visit('/')

    // کلیک روی محصول Claw Hammer
    cy.contains('[data-testid="product-name"]', 'Claw Hammer 16oz')
   .parents('[data-testid="product-card"]')
   .find('[data-testid="add-to-cart-btn"]')
   .click()

    // بررسی badge سبد خرید
    cy.get('[data-testid="nav-cart"]')
  .should('have.text', '1')

  })

it('testcase 9', () => {

 cy.visit('/')

 // افزودن محصول به سبد
 cy.get('[data-testid="add-to-cart-btn"]')
  .first()
  .click()

 // رفتن به صفحه Checkout
 cy.visit('/checkout')

 // تغییر تعداد به 3
 cy.get('[data-testid="cart-qty-increase"]').click()

 cy.get('[data-testid="cart-qty-increase"]').click()

 // بررسی تعداد
 cy.get('[data-testid="cart-quantity"]')
  .should('have.text', '3')

 // بررسی مبلغ کل
 cy.get('[data-id="summary-item-price"]')
  .should('contain.text', '$50.97')

  })

it('testcase 10', () => { 
 
  cy.visit('/')

 // افزودن محصول
 cy.get('[data-testid="add-to-cart-btn"]')
  .eq(0)
  .click()

 // افزودن محصول دوم
 cy.get('[data-testid="add-to-cart-btn"]')
  .eq(0)
  .click()

 // رفتن به Checkout
 cy.visit('/checkout')
 cy.wait(1000)
 // حذف محصول
 cy.get('[data-testid="cart-qty-decrease"]').click()
 cy.wait(1000)

  })

it('testcase 11', () => {

 // لاگین اول
 cy.visit('/auth/login')

 cy.get('[data-testid="email"]')
  .type('customer@automationcamp.org')

 cy.get('[data-testid="password"]')
  .type('welcome01')

 cy.get('[data-testid="login-submit"]')
  .click()

 // رفتن به صفحه محصول
 cy.visit('/product/prod-1')
 cy.wait(800)

 // کلیک روی Favorite
  cy.get('[data-testid="favorite-btn"]')
  .click()
  cy.wait(800)
 // لاگین مجدد
 cy.get('[data-testid="email"]')
  .type('customer@automationcamp.org')
  
  cy.wait(800)
   
 cy.get('[data-testid="password"]')
  .type('welcome01')

 cy.get('[data-testid="login-submit"]')
  .click()
  cy.wait(800)

 // رفتن به صفحه علاقه‌مندی‌ها
 cy.visit('/account/favorites')

 cy.get('body').then(($body) => {
  console.log($body.html())
})
  })



it('testcase 12', () => {

  cy.visit('/contact')

    cy.get('[data-testid="contact-name"]')
      .type('Maryam Sharifpour')

    cy.get('[data-testid="contact-email"]')
      .type('maryam@test.com')

    cy.get('[data-testid="contact-subject"]')
      .type('Test Subject')

    cy.get('[data-testid="contact-message"]')
      .type('This is a test message sent by Cypress.')

    cy.get('[data-testid="contact-submit"]')
      .click()

  })


it('testcase 13', () => {

  cy.visit('/auth/login')

    cy.get('[data-testid="email"]')
      .type('customer@automationcamp.org')

    cy.get('[data-testid="password"]')
      .type('welcome01')

    cy.intercept('POST', 'http://localhost:5173/api/users/login').as('userLogin')
    cy.get('[data-testid="login-submit"]')
      .click()
    cy.wait('@userLogin').its('response.statusCode').should('eq',200)

    
    // Navigate to profile page
    cy.visit('/account/profile')

    // Verify profile fields exist
    cy.contains('Name').should('exist')
    cy.contains('Email').should('exist')
    cy.contains('Phone').should('exist')
    cy.contains('Date of Birth').should('exist')
    cy.contains('Street').should('exist')
    cy.contains('House No.').should('exist')
    cy.contains('City').should('exist')
    cy.contains('State').should('exist')
    cy.contains('Country').should('exist')
    cy.contains('Postal Code').should('exist')

    // Verify Change Password section
    cy.contains('Change Password')
      .should('be.visible')


  })

it('testcase 14', () => {   

  const brandName = 'Test Brand'

  cy.visit('/auth/login')

    cy.get('[data-testid="email"]').type('admin@automationcamp.org')

    cy.get('[data-testid="password"]') .type('welcome01')

    cy.intercept('POST', 'http://localhost:5173/api/users/login').as('userLogin')
    cy.get('[data-testid="login-submit"]').click()
    cy.wait('@userLogin').its('response.statusCode').should('eq',200)

    // Navigate to Brands page
    cy.visit('/admin/brands')

    // Add Brand
    cy.get('[data-testid="add-brand"]').click()

    cy.get('[data-testid="brand-name"]').type(brandName)

    cy.intercept('POST', '**/brands').as('addBrand')

    cy.get('[data-testid="submit-brand"]').click()
    cy.wait('@addBrand').its('response.statusCode').should('eq', 201)

    // Verify brand appears in list
    cy.contains(brandName)
      .should('exist')

  })

it('testcase 15', () => { 
  
  cy.visit('/auth/login')

    cy.get('[data-testid="email"]').type('admin@automationcamp.org')

    cy.get('[data-testid="password"]') .type('welcome01')

    cy.intercept('POST', 'http://localhost:5173/api/users/login').as('userLogin')
    cy.get('[data-testid="login-submit"]').click()
    cy.wait('@userLogin').its('response.statusCode').should('eq',200)
    cy.visit('/admin/products')

    cy.contains('Add Product').click()

  cy.get('[data-testid="product-name"]').type('iPhone 17')
  cy.get('[data-testid="product-description"]').type('New Apple Phone')
  cy.get('[data-testid="product-price"]').type('1500')
  cy.get('[data-testid="product-stock"]').type('20')
  cy.get('[data-testid="product-category"]').select('Hand Tools')
  cy.get('[data-testid="product-brand"]').select('Test Brand')
  cy.get('[data-testid="product-co2"]').select('A')
  cy.get('[data-testid="product-image"]').type('https://example.com/image.jpg')
  cy.get('[data-testid="product-rental"]').check()
  


  cy.intercept('POST', '**/products').as('addProduct')

  cy.get('[data-testid="submit-product"]').click()

  cy.get('[data-testid="search-products"]').type('iPhone 17')

  cy.contains('iPhone 17')
  .should('be.visible')
  })

it('testcase 16', () => { 
  
  cy.visit('/auth/login')

    cy.get('[data-testid="email"]').type('admin@automationcamp.org')

    cy.get('[data-testid="password"]') .type('welcome01')

    cy.intercept('POST', 'http://localhost:5173/api/users/login').as('userLogin')
    cy.get('[data-testid="login-submit"]').click()
    cy.wait('@userLogin').its('response.statusCode').should('eq',200)
    
    cy.visit('/admin/orders')
    cy.get('[data-testid="view-order"]').first().click()
    cy.get('[data-testid="status-select"]').select('SHIPPED')
    cy.wait(1000)
    cy.intercept('PUT', 'http://localhost:5173/api/invoices/inv-5/status').as('updateOrder')
    cy.get('[data-testid="update-status"]').click()
    cy.wait('@updateOrder').its('response.statusCode').should('eq', 200)
    cy.visit('/admin/orders')
    cy.contains('SHIPPED')
    .should('be.visible')
     })

it('testcase 17', () => {

  cy.visit('/auth/login')
    cy.get('[data-testid="email"]').type('admin@automationcamp.org')
    cy.get('[data-testid="password"]') .type('welcome01')
    cy.intercept('POST', 'http://localhost:5173/api/users/login').as('userLogin')
    cy.get('[data-testid="login-submit"]').click()
    cy.wait('@userLogin').its('response.statusCode').should('eq',200)

    cy.visit('/admin/users')
    cy.contains('customer3@automationcamp.org').parents('tr').find('[data-testid="edit-user"]').click()
    cy.get('[data-testid="enabled"]').uncheck() 
    cy.wait(1000)
    cy.get('[data-testid="submit-user"]').click()
    cy.wait(2000)
    cy.contains('Sign out').click()

    
    cy.visit('/auth/login')
    cy.get('[data-testid="email"]').type('customer3@automationcamp.org')
    cy.get('[data-testid="password"]') .type('welcome01')
    cy.get('[data-testid="login-submit"]').click()
    
    
    cy.contains('Your account has been disabled')
    .should('be.visible')

  })

it('testcase 18', () => {

  cy.request('GET', '/api/products')
      .then((response) => {

        console.log(response.body)

        // Status Code
        expect(response.status).to.eq(200)

        // وجود data
        expect(response.body).to.have.property('data')

        // data باید array باشد
        expect(response.body.data).to.be.an('array')

        // حداقل یک محصول وجود داشته باشد
        expect(response.body.data.length).to.be.greaterThan(0)

        // بررسی ساختار اولین محصول
        expect(response.body.data[0]).to.have.property('id')
        expect(response.body.data[0]).to.have.property('name')
        expect(response.body.data[0]).to.have.property('price')

        cy.request('GET', '/api/products')
  .then((response) => {

    console.log(response.body)


  })})})

it('testcase 19', () => {

  cy.request('POST', '/api/users/login', {
      email: 'admin@automationcamp.org',
      password: 'welcome01'
    }).then((loginResponse) => {

      const token = loginResponse.body.access_token

      // Create Product
      cy.request({
        method: 'POST',
        url: '/api/products',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          name: 'iPhone 17',
          description: 'New Apple Phone',
          price: 1500,
          stock: 20
        }
      }).then((createResponse) => {
        console.log(createResponse.body)

        expect(createResponse.status).to.eq(201)

        expect(createResponse.body).to.have.property('id')

        const productId = createResponse.body.id

        // Verify Product Exists
        cy.request('GET', '/api/products')
          .then((productsResponse) => {

            const product = productsResponse.body.data?.find(
             p => p.productId === productId || p.id === productId
               )
            console.log('FOUND PRODUCT:', product)


            expect(productId).to.exist

          })
  })})})


it('testcase 20', () => {

  cy.request('POST', '/api/users/login', {
      email: 'admin@automationcamp.org',
      password: 'welcome01'
    }).then((loginResponse) => {

      const token = loginResponse.body.access_token

      // Create product first 
      cy.request({
        method: 'POST',
        url: '/api/products',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          name: 'iPhone 17',
          description: 'New Apple Phone',
          price: 1500,
          stock: 20
        }
      }).then((createResponse) => {

        expect(createResponse.status).to.eq(201)

        const productId = createResponse.body.id

        expect(productId).to.exist

        // Update product
        cy.request({
          method: 'PUT',
          url: `/api/products/${productId}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            name: 'iPhone 18',
            description: 'Updated Apple Phone',
            price: 1800,
            stock: 10
          }
        }).then((updateResponse) => {

          expect(updateResponse.status).to.eq(200)

          // Verify updated product
          cy.request({
            method: 'GET',
            url: `/api/products/${productId}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((getResponse) => {

            expect(getResponse.status).to.eq(200)

            expect(getResponse.body.name).to.eq('iPhone 18')
            expect(getResponse.body.description).to.eq('Updated Apple Phone')
            expect(getResponse.body.price).to.eq(1800)
            expect(getResponse.body.stock).to.eq(10)


      })
  })})})})

it('testcase 21', () => {

     // 1. Login
    cy.request('POST', '/api/users/login', {
      email: 'admin@automationcamp.org',
      password: 'welcome01'
    }).then((loginResponse) => {

      const token = loginResponse.body.access_token

      // 2. Create product first
      cy.request({
        method: 'POST',
        url: '/api/products',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          name: 'iPhone 17',
          description: 'Test product',
          price: 1500,
          stock: 20
        }
      }).then((createResponse) => {

        const productId = createResponse.body.id

        expect(productId).to.exist

        // 3. Delete product
        cy.request({
          method: 'DELETE',
          url: `/api/products/${productId}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((deleteResponse) => {

          expect([200, 204]).to.include(deleteResponse.status)

          // 4. Verify deletion
          cy.request({
            method: 'GET',
            url: `/api/products/${productId}`,
            failOnStatusCode: false,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((getResponse) => {

            expect(getResponse.status).to.eq(404)

          })

        })

    })})})

it('testcase 22', () => {

    cy.request({

      method: 'POST',
      url: '/api/users/login',
      body: {
        email: 'admin@automationcamp.org',
        password: 'welcome01'
      }
    }).then((response) => {

      // 1️⃣ Check status
      expect(response.status).to.eq(200)

      // 2️⃣ Check token exists
      expect(response.body).to.have.property('access_token')

      // 3️⃣ Check user object exists
      expect(response.body).to.have.property('user')

      // 4️⃣ Check user fields
      expect(response.body.user).to.have.property('id')
      expect(response.body.user).to.have.property('email')
      expect(response.body.user).to.have.property('role')

      // 5️⃣ Check email correctness
      expect(response.body.user.email).to.eq('admin@automationcamp.org')

    })


  })

it('testcase 23', () => {

   cy.request({
      method: 'POST',
      url: '/api/users/login',
      body: {
        email: 'admin@automationcamp.org',
        password: 'welcome01'
      }
    }).then((loginResponse) => {

      const token = loginResponse.body.access_token

      // 2️⃣ Create brand
      cy.request({
        method: 'POST',
        url: '/api/brands',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          name: 'Apple'
        }
      }).then((createResponse) => {

        // 3️⃣ Check status
        expect(createResponse.status).to.eq(201)

        // 4️⃣ Check response body
        expect(createResponse.body).to.have.property('id')
        expect(createResponse.body).to.have.property('name')

        // 5️⃣ Check values
        expect(createResponse.body.name).to.eq('Apple')

      })

    })

  })

it('testcase 24', () => {

   cy.request('POST', '/api/users/login', {
   email: 'admin@automationcamp.org',
   password: 'welcome01'
   }).then((loginResponse) => {

  const token = loginResponse.body.access_token

  cy.request({
    method: 'POST',
    url: '/api/products',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      name: 'iPhone 17',
      price: 1500,
      stock: 10
    }
    }).then((createResponse) => {

    expect(createResponse.status).to.eq(201)

    expect(createResponse.body).to.have.property('id')
    const productId = createResponse.body.id

    console.log(createResponse.body)

    

      // اضافه کردن محصول واقعی به cart
      cy.request('POST', '/api/carts')
      .then((cartResponse) => {

      console.log(cartResponse.body)

      const cartId =
      cartResponse.body.id ||
      cartResponse.body.cartId ||
      cartResponse.body.data?.id

      expect(cartId, 'cartId should exist').to.exist

      cy.request({
      method: 'POST',
      url: `/api/carts/${cartId}`,
      body: {
        product_id: productId,
        quantity: 2
      }
    })


        // بررسی cart
        cy.request(`GET /api/carts/${cartId}`)
          .then((getResponse) => {

            const items = getResponse.body.items || []

            const product = items.find(
              i => i.product_id === productId
            )

            
            expect(productId).to.exist
            
        })

      })


  })})})

it('testcase 25', () => {

    // Login
    cy.request('POST', '/api/users/login', {
      email: 'customer@automationcamp.org',
      password: 'welcome01'
    }).then((loginResponse) => {

      const token = loginResponse.body.access_token

      // Create cart
      cy.request({
        method: 'POST',
        url: '/api/carts',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((cartResponse) => {

        const cartId = cartResponse.body.id
        cy.request({
              method: 'POST',
              url: '/api/products',
              headers: {
              Authorization: `Bearer ${token}`
               },
              body: {
               name: 'iPhone 17',
              price: 1500,
                stock: 10
      }
      }).then((createResponse) => {

      const productId = createResponse.body.id

       console.log('productId =', productId)

        expect(cartId).to.exist

        // Add item to cart
        cy.request({
          method: 'POST',
          url: `/api/carts/${cartId}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            product_id: productId,
            quantity: 1
          }
        }).then(() => {

          // Create invoice/order
          cy.request({
            method: 'POST',
            url: '/api/invoices',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              cart_id: cartId,
              address: 'Tehran, Test Street',
              payment: {
                method: 'CARD'
              }
            }
          }).then((invoiceResponse) => {

            expect(invoiceResponse.status).to.eq(201)

            expect(invoiceResponse.body).to.have.property('id')

            expect(invoiceResponse.body.status)
              .to.eq('AWAITING_FULFILLMENT')

          })

        })

      })

     })})})
it('testcase 26', () => {

   cy.request('POST', '/api/users/login', {
      email: 'customer@automationcamp.org',
      password: 'welcome01'
    }).then((loginResponse) => {

      const token = loginResponse.body.access_token

      // از یک محصول موجود استفاده کن
      cy.request('GET', '/api/products')
        .then((productsResponse) => {

          const productId = productsResponse.body.data[0+7].id

          // Add to favorites
          cy.request({
            method: 'POST',
            url: '/api/favorites',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              product_id: productId
            }
          }).then((favoriteResponse) => {

            expect([200, 201]).to.include(favoriteResponse.status)

            // Verify favorites
            cy.request({
            method: 'GET',
                url: '/api/favorites',
                headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((favoritesResponse) => {

              console.log(favoritesResponse.body) // 🔥 خیلی مهم

              const list = favoritesResponse.body.data || favoritesResponse.body

              const favorites = list.find(p =>
                p.id === productId || p.product_id === productId
              )

               expect(favorites).to.exist
                 })

            })

          })})})

it('testcase 27', () => {

        cy.request({
        method: 'GET',
        url: '/api/users/me',
        failOnStatusCode: false
      }).then((res) => {

       expect(res.status).to.eq(401)

       expect(res.body).to.have.property('message')
       expect(res.body.message).to.eq('Access token is required')
      })


   })