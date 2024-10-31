import { useShoppingCart } from "use-shopping-cart";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Handbag } from "phosphor-react"
import Image from "next/image";
import { CartContainer, ImageContainer, PriceText, ProductContainer, ProductDetails, QuantityText, RemoveProductButton, SetOrderButton, TotalPriceContainer, TotalQuantityContainer } from "@/styles/components/cart";
import { useState } from "react";
import axios from "axios";

export function CartDrawer() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { cartDetails, removeItem } = useShoppingCart()

  const cartIsEmpty = cartDetails && Object.keys(cartDetails).length === 0;

  const totalQuantity = cartDetails
    ? Object.values(cartDetails).reduce((acc, item) => acc + item.quantity, 0)
    : 0

  const totalPrice = cartDetails
    ? Object.values(cartDetails).reduce((acc, item) => acc + (item.price * item.quantity), 0)
    : 0

    async function handleBuyProduct() {
      try {
        setIsCreatingCheckoutSession(true)

        const itemIds = cartDetails && Object.values(cartDetails).map(item => ({
          priceId: item.defaultPriceId,
          quantity: item.quantity, 
        }));

        const response = await axios.post('/api/checkout', {
          itemIds
        });

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

      } catch(err) {
        setIsCreatingCheckoutSession(false)

        alert('Falha ao redirecionar ao checkout!')
      } finally {
        setIsCreatingCheckoutSession(false)
      }
    }

  return (
    <Drawer direction="right">
      <DrawerTrigger><Handbag weight="bold" size={20}></Handbag></DrawerTrigger>
      <DrawerContent color="#202024">
        <DrawerHeader>
          <DrawerTitle>Sacola de compras</DrawerTitle>
          <DrawerDescription>Confira os itens que você mais gostou!</DrawerDescription>
        </DrawerHeader>

        <CartContainer>
          {cartDetails && Object.values(cartDetails).map((item) => (
            <ProductContainer key={item.id} className="flex items-start m-2">
              <ImageContainer>
                <Image src={item.image!} alt={item.name} width={102} height={93} className="p-0" />
              </ImageContainer>
              <ProductDetails className="ml-4">
                <p className="text-[#C4C4CC]">{item.name}</p>
                <QuantityText className="text-xs mb-1">Quantidade: {item.quantity}</QuantityText>
                <PriceText>{new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}</PriceText>

                <RemoveProductButton
                  onClick={() => removeItem(item.id)}
                >Remover</RemoveProductButton>
              </ProductDetails>
            </ProductContainer>
          ))}
        </CartContainer>

        <DrawerFooter>
          <TotalQuantityContainer style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <p>Quantidade: </p>
            <p>{totalQuantity} itens </p>
          </TotalQuantityContainer>

          <TotalPriceContainer style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <p>Valor Total: </p>
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalPrice)}
            </p>
          </TotalPriceContainer>
          <SetOrderButton disabled={cartIsEmpty || isCreatingCheckoutSession} onClick={handleBuyProduct}>{isCreatingCheckoutSession ? "Finalizando..." : "Finalizar compra"}</SetOrderButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}