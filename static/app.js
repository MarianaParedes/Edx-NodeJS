'use strict'

// API URL
const API = 'http://localhost:3000'

// Populate products from API method
const populateProducts = async (category, method = 'GET', payload) => { // a populateProducts le asigna una funcion asincrona con los params categoria, metodo, carga útil
  const products = document.querySelector('#products') //toma el selector productsde un div
  products.innerHTML = '' //lo pone en blanco
  const send = method === 'GET' ? {} : {  //en una constante send, metodo verifica si es get, entonces un obj vacio, sino envia los headers y en el body envia un JSON con el param payload
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }
  const res = await fetch(`${API}/${category}`, { method, ...send }) // 1) a una constante RES de response le asigna una funcion asincrona fetch ? (método)  API/categoria, con los parámetros(?) método y send
                                                                     // 2 se ejecuta el fetch trayendo data que despues es tratada     
  const data = await res.json()  // 1) a la const data lo toma como asincrono pasandole el res de arriba como json 2) el res lo convierte a json para usarlo abajo 3)render data from the response
  for (const product of data) {
    const item = document.createElement('product-item')
    for (const key of ['name', 'rrp', 'info']) {
      const span = document.createElement('span')
      span.slot = key
      span.textContent = product[key]
      item.appendChild(span)
    }
    products.appendChild(item)
  }
}

// Get elements from DOM
const category = document.querySelector('#category')
const add = document.querySelector('#add')

// Populate products
category.addEventListener('input', async ({ target }) => { //Llama a populateProducts cuando la categoria se cambia
  add.style.display = 'block'
  await populateProducts(target.value) //este target no se que onda target.value parece ser el valor del select
})

// Add product
add.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { target } = e //el evento?
  const payload = {
    name: target.name.value,
    rrp: target.rrp.value,
    info: target.info.value
  }
  await populateProducts(category.value, 'POST', payload)
  target.reset() //no se que onda
})

// Custom element
customElements.define('product-item', class Item extends HTMLElement {
  constructor() {
    super()
    const itemTmpl = document.querySelector('#item').content
    this.attachShadow({mode: 'open'}).appendChild(itemTmpl.cloneNode(true))
  }
})