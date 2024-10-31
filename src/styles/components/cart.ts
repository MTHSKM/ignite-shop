import { styled } from "..";

export const CartContainer = styled("div", {
    display: "grid",
    gap: "1.5",
    padding: "1rem",
    textAlign: "center",

    '@media (min-width: 640px)': {
        textAlign: "left",
    }
})

export const ProductContainer = styled("div", {
    display: "flex",
    alignItems: "flex-start",
    margin: "0.5rem"
})

export const ImageContainer = styled("div", {
    width: "100%",
    maxWidth: 102,
    height: 93,
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 8,
    padding: "0.25rem",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "cover",
    },
})

export const ProductDetails = styled("div", {
    marginLeft: "1rem"
})

export const NameText = styled("p", {
    color: "$gray800",
    fontSize: "$md"
})

export const QuantityText = styled("p", {
    fontSize: "0.75rem",
    marginBottom: "0.25rem"
})

export const PriceText = styled("p", {
    fontWeight: "bold",
    fontSize: "$md"
})

export const RemoveProductButton = styled("button", {
    color: "$green300",
    fontSize: "0.85rem",
    fontWeight: "bold",

    '&:hover': {
        color: '$green500'
    }
})

export const SetOrderButton = styled("button", {
    marginTop: "auto",
    backgroundColor: "$green300",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    },

    "&:not(disabled):hover": {
        backgroundColor: "$green500",
    },
})

export const TotalQuantityContainer = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",

    "& p:last-child": {
        marginLeft: "0.5rem"
    }
})

export const TotalPriceContainer = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontWeight: "bold",
    marginBottom: "3rem",

    "& p:last-child": {
        fontSize: "$xl",
        marginLeft: "0.5rem"
    }
})