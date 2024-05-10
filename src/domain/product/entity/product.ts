export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(private props: ProductProps) {}

  public static create(name: string, price: number) {
    return new this({
      id: crypto.randomUUID.toString(),
      name,
      price,
      quantity: 0,
    });
  }

  public static with(props: ProductProps) {
    return new this(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get quantity() {
    return this.props.quantity;
  }

  // TODO: Validation
  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity;
  }

  // TODO: Validation
  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity;
  }
}
