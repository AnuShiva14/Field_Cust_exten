import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  type IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'SpFxFieldCustFieldCustomizerStrings';
import styles from './SpFxFieldCustFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxFieldCustFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'SpFxFieldCustFieldCustomizer';

export default class SpFxFieldCustFieldCustomizer
  extends BaseFieldCustomizer<ISpFxFieldCustFieldCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated SpFxFieldCustFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "SpFxFieldCustFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    if(this.context.field.internalName ==='SPFxPercentage'){
      let value: number=parseInt(event.fieldValue);
      if(value<50)
      {
        event.domElement.innerHTML=`<div class='${styles.red}'> 
        ${event.fieldValue}</div>
        `;
      }
      else if(value>50 && value <90)
      {
        event.domElement.innerHTML=`<div class='${styles.yellow}'> 
        ${event.fieldValue}</div>
        `;
      }
      else
      {
        event.domElement.innerHTML=`<div class='${styles.green}'> 
        ${event.fieldValue}</div>
        `;
      }
      
    }
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
