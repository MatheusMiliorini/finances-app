export default interface Category {
  id: string;
  name: string;
  parent?: string;
  active: boolean;
}