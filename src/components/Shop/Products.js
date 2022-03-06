import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCT = [
  {
    id: "p1",
    price: 6,
    title: "first book",
    description: "the first book i ever wrote",
  },
  {
    id: "p2",
    price: 10,
    title: "second book",
    description: "the second book i ever wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.length > 0 &&
          DUMMY_PRODUCT.map((product) => (
            <ProductItem
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              id={product.id}
            />
          ))}
      </ul>
    </section>
  );
};

export default Products;
