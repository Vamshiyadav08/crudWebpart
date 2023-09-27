// import { Environment } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICrudWebpartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  productname: string;
  productdescription: string;
  prodcutcost:number;
  quantity:number;
  bilamount: number;
  discount: number;
  netbillamt: number;
}
