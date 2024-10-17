export class UserBaseReqDto {
   //додає дане поле в swagger. 
   //Дозволяє свагеру зрозуміти що модель потрібно додати до вхідного body
   // @ApiProperty()
   name: string; 
   age?: number;
   email: string;
   role: string;
   password: string;
}