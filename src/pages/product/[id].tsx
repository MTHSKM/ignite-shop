import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string | null;
    defaultPriceId: string
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { addItem } = useShoppingCart()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      await new Promise(resolve => setTimeout(resolve, 1000))

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: 'BRL',
        image: product.imageUrl,
        quantity: 1,
        defaultPriceId: product.defaultPriceId
      })

    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datalog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    } finally {
      setIsCreatingCheckoutSession(false);
    }
  }

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p> Loading... </p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480}></Image>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>{isCreatingCheckoutSession ? 'Processando...' : 'Adicionar ao Carrinho'}</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      /* 5 ~ 10 produtos mais acessados */
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {

  const productId = params?.id
  if (!productId) {
    return { notFound: true }
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount ? price.unit_amount / 100 : 0,
        description: product.description,
        defaultPriceId: price.id
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
