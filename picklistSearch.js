import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import acc from '@salesforce/schema/Account';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import typeField from '@salesforce/schema/Account.Type';

export default class PicklistSearch extends LightningElement {
    accountTypes;
    selectedTypeValue;
    @wire(getObjectInfo, { objectApiName: acc })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: typeField })
    typeValues ({data, error}){
        if(data){
            this.accountTypes = data.values;
        } else if(error){
            console.log("error"+error);
        }
    } 
    handleChange(event) {
        this.selectedTypeValue = event.detail.value;
    } 
    handleClick(event){
        const selectEvent = new CustomEvent('getrecordsevent', {
            detail: this.selectedTypeValue
        });
        this.dispatchEvent(selectEvent);
    }  
}