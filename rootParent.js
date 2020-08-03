import { LightningElement } from 'lwc';

export default class RootParent extends LightningElement {
    selectedValue;
    handleCustomEvent(event){
        this.selectedValue = event.detail;
    }    
}