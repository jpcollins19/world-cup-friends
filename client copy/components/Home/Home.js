import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const products = useSelector((state) => state.products);

  return (
    <div>
      <div className="home-category azuki">
        <h1 className="category-title">Azuki</h1>
        <div>
          {products
            .filter((product) => product.category === "Azuki")
            .map((product) => (
              <div
                style={{
                  backgroundImage: `url(${product.imageURL}) `,
                  width: "360px",
                  height: "360px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              ></div>
            ))}
        </div>
      </div>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
