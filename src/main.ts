import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.route";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/products/products.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUseCase } from "./usecases/product/create/create-product.usecase";
import { ListProductUseCase } from "./usecases/product/list/list-product.usecase";
import { ApiExpress } from "./infra/api/express/api.express";

function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma);

  const createProductUseCase = CreateProductUseCase.create(aRepository);
  const listProductUseCase = ListProductUseCase.create(aRepository);

  const createRoute = CreateProductRoute.create(createProductUseCase);
  const listRoute = ListProductRoute.create(listProductUseCase);

  const api = ApiExpress.create([createRoute, listRoute]);

  const port = 8000;

  api.start(port);
}

main();
