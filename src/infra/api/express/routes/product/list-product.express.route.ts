import { HttpMethod } from "./../route";
import { Route } from "../route";
import {
  ListProductInputDto,
  ListProductOutputDto,
  ListProductUseCase,
} from "../../../../../usecases/product/list/list-product.usecase";
import { Request, Response } from "express";

export type ListProductResponseDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase
  ) {}

  public static create(listProductService: ListProductUseCase) {
    return new this("/products", HttpMethod.GET, listProductService);
  }

  public getHandler() {
    return async (_req: Request, res: Response) => {
      const output = await this.listProductService.execute();

      res.status(200).json(this.present(output)).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
    };

    return response;
  }
}
