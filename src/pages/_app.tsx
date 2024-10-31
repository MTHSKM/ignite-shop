import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import logoImage from "../assets/logo.svg";
import { Container, Header, IconWrapper } from "@/styles/pages/app";
import Image from "next/image";
import { CartProvider } from "use-shopping-cart";
import '../styles/global.css';
import { CartDrawer } from "@/components/cart";
import Link from "next/link";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider cartMode="checkout-session" stripe={process.env.STRIPE_PUBLIC_KEY!} currency="BRL" shouldPersist={true}>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImage} alt=""></Image>
          </Link>
          <IconWrapper>
            <CartDrawer></CartDrawer>
          </IconWrapper>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
