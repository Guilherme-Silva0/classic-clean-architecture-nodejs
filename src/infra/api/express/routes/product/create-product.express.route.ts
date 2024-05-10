import {
  CreateProductInputDto,
  CreateProductOutputDto,
} from "./../../../../../usecases/product/create/create-product.usecase";
import { Request, Response } from "express";
import { CreateProductUseCase } from "../../../../../usecases/product/create/create-product.usecase";
import { HttpMethod, Route } from "../route";

export type CreateProductResponseDto = {
  id: string;
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase
  ) {}

  public static create(createProductService: CreateProductUseCase) {
    return new this("/products", HttpMethod.POST, createProductService);
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const { name, price } = req.body;

      const input: CreateProductInputDto = {
        name,
        price,
      };

      const output: CreateProductOutputDto =
        await this.createProductService.execute(input);

      res.status(201).json(this.present(output)).send();
    };
  }

  public getPath(): String {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: CreateProductOutputDto): CreateProductResponseDto {
    return { id: input.id };
  }
}
