import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { UpdateUserInput } from './update-user.input';
import { FilterInput } from 'src/common/paginated.input';

@InputType()
export class FilterUserInput extends PickType(UpdateUserInput, [
  'username',
  'email',
  'status',
] as const) {}
@InputType()
export class FilterUserInputByPage extends FilterInput(FilterUserInput) {}
