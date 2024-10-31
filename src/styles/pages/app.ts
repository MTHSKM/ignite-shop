import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "0 1rem",
});

export const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent:'space-between',
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1100,
  margin: "0 calc((100vw - 1180px) / 2)",
});

export const IconWrapper = styled("div", {
  backgroundColor: "$gray800",
  padding: "0.75rem",
  borderRadius: "8px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  "&:hover svg": {
    color: "$white"
  }
});