import { Product } from "../../../domain/product/entity/product";
import { ProductGateway } from "./../../../domain/product/gateway/product.gateway";
import { UseCase } from "./../../useCase";
export type CreateProductInputDto = {
  name: string;
  price: number;
};
export type CreateProductOutputDto = {
  id: string;
};

export class CreateProductUseCase
  implements UseCase<CreateProductInputDto, CreateProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new this(productGateway);
  }

  public async execute({
    name,
    price,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const aProduct = Product.create(name, price);

    await this.productGateway.save(aProduct);

    return this.presentOutput(aProduct);
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    return {
      id: product.id,
    };
  }
}
