import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CrudWebpartWebPartStrings';
import CrudWebpart from './components/CrudWebpart';
import { ICrudWebpartProps } from './components/ICrudWebpartProps';

export interface ICrudWebpartWebPartProps {
  description: string;
}

export default class CrudWebpartWebPart extends BaseClientSideWebPart<ICrudWebpartWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ICrudWebpartProps> = React.createElement(
      CrudWebpart,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context:this.context,
        productname: "productName",
        productdescription: "Descrip",
        prodcutcost:20,
        quantity:3,
        bilamount: 40,
        discount: 2,
        netbillamt: 400,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges():boolean{
    return true;
  }

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('productname', {
                  label:"productname'",
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                  
                }),
                PropertyPaneTextField('productdescription', {
                  label: 'productdescription',
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                }),
                PropertyPaneTextField('productcost', {
                  label: 'productcost',
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                }),
                PropertyPaneTextField('quantity', {
                  label:'quantity',
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                }),
                PropertyPaneTextField('billamount', {
                  label: 'billamount',
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                }),
                PropertyPaneTextField('discount', {
                  label: 'discount',
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                }),
                PropertyPaneTextField('netbillamt', {
                  label: 'netbillamt',
                  multiline:false,
                  resizable:false,
                  deferredValidationTime:5000,
                  placeholder:"please enter products","description":"name of property feild"
                }),


              ]
            }
          ]
        }
      ]
    };
  }
}
