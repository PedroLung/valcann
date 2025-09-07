import { userRepository } from "../repositories/user.repository";
import { FindOptionsWhere, Like } from "typeorm";

export async function listUsers({ page = 1, page_size = 10, q, role, is_active }: any) {
  const repo = userRepository();
  const take = Math.min(Number(page_size) || 10, 50);
  const skip = (Number(page) - 1) * take;

  const where: any = {};
  if (role) where.role = role;
  if (typeof is_active !== "undefined") where.is_active = is_active === "true" || is_active === true;

  // q -> search name OR email (LIKE)
  const qb = repo.createQueryBuilder("user").where(where);

  if (q) {
    qb.andWhere("(user.name LIKE :q OR user.email LIKE :q)", { q: `%${q}%` });
  }

  const [data, total] = await qb.orderBy("user.id", "ASC").skip(skip).take(take).getManyAndCount();

  return {
    data,
    pagination: {
      page: Number(page),
      page_size: take,
      total,
      total_pages: Math.ceil(total / take)
    }
  };
}

export async function getUserById(id: number) {
  const repo = userRepository();
  return repo.findOneBy({ id });
}
