import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex"></meta>
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada com sucesso!</h1>

        <ImageContainer>
          <Image src={products[0].imageUrl} width={120} height={110} alt=""></Image>
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra {" "}
          <strong>
            {products.map((product, index) => (
              <span key={product.name}>
                {product.name}
                {index < products.length - 1 ? ", " : ""}
              </span>
            ))}
          </strong> {" "}
          {products.length > 0 ? "já estão a caminho da sua casa." : "já está a caminho da sua casa."}
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  if (!customerName) {
    return { notFound: true }
  }

  const products = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product;
    return {
      name: product.name,
      imageUrl: product.images[0],
    };
  }) || []

  return {
    props: {
      customerName,
      products
    }
  }
}