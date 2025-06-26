export interface registerFormValues{
    name:string,
    email:string,
    password:string
}

export interface loginFormValues{
    email:string,
    password:string
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  reorderLevel: number;
  createdAt: string;
}

export interface StockChange{
   id: string;
  name: string;
  date: string;
  action: 'add' | 'reduce';
  quantity: number;
  remarks?: string;
}