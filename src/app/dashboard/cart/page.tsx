import { WidgetItem } from "@/components/WidgetItem";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components/ItemCard";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Carrito de compras',
  description: 'Soy un carrito de compras bien perron'
}

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = []
  for (const id of Object.keys(cart)) {
    const product = products.find(prod => prod.id === id)
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] })
    }
  }
  return productsInCart;
}

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart').value ?? '{}') as { [id: string]: number }
  const productsInCart = getProductsInCart(cart)

  const totalPay = productsInCart.reduce(
    (prev, current) => (current.product.price * current.quantity) + prev, 0
  )


  return (
    <>
      <h1 className="text-3xl">Productos en el carrito</h1>
      <hr className="mb-2"></hr>

      <div className="flex flex-col sm:flex-row gap-2 w-full">

        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map(({ product, quantity }) => (
              <ItemCard product={product} quantity={quantity} key={product.id} />
            ))
          }
        </div>

        <div className="flex flex-col w-full sm:w-4/12">

          <WidgetItem title="Total a pagar">

            <div className="mt-2 flex justify-center">
              <h2 className="text-3xl font-bold text-gray-700">${(totalPay * 1.15).toFixed(2)}</h2>
            </div>
            <span className="font-bold text-center ">Impuestos 15%: ${(totalPay * 0.15).toFixed(2)} </span>
          </WidgetItem>


        </div>


      </div>
    </>
  )
}

