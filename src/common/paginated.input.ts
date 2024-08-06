import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  nodes: T[];
  total: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => [classRef], { nullable: true })
    nodes: T[];
    @Field((type) => Int)
    total: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

type SORTTYPE = 'ASC' | 'DES';

export interface IFilter<T> {
  search: T;
  page: number;
  pageSize: number;
  sort?: SORTTYPE;
  sorts_params?: string;
}

export function FilterInput<T>(classRef: Type<T>): Type<IFilter<T>> {
  @InputType(`${classRef.name}Filter`)
  @InputType({ isAbstract: true })
  abstract class Filter implements IFilter<T> {
    @Field(() => classRef)
    search: T;
    @Field((type) => Int, {
      description: 'Bắt đầut từ trang bao nhiêu, mặc định là 1',
      defaultValue: 1,
    })
    page: number;
    @Field((type) => Int, {
      description: 'Số lượng phần tử cần hiển thị , mặc định là 10',
      defaultValue: 10,
    })
    pageSize: number;
    @Field(() => String, { nullable: true })
    sort?: 'ASC' | 'DES';
    @Field({ nullable: true })
    sorts_params?: string;
  }
  return Filter as Type<IFilter<T>>;
}
