const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProduct = async (product) => {
  try {
    console.log(product);
    const { data } = await prisma.productsKey.create({
      data: product,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const paginationService = async (idCursor) => {
  try {
    const limit = 9;
    const cursor = idCursor ?? "";
    const cursorObj = idCursor === "" ? undefined : { id: Number(idCursor) };

    const products = await prisma.productsKey.findMany({
      take: limit,
      skip: idCursor !== "" ? 1 : 0,
      cursor: cursorObj,
      where: {
        store: {
          name: "Steam",
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        store: true,
      },
    });

    return {
      products,
      nextId:
        products.length === limit
          ? products[products.length - 1].id
          : undefined,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { paginationService, createProduct };
