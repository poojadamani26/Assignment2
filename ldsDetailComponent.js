import { LightningElement, api } from 'lwc';
import pubsub from 'c/pubsub' ; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import nameField from '@salesforce/schema/Account.Name';
import phoneField from '@salesforce/schema/Account.Phone';
import sourceField from '@salesforce/schema/Account.AccountSource';
import typeField from '@salesforce/schema/Account.Type';
import accNumberField from '@salesforce/schema/Account.AccountNumber';

export default class LdsDetailComponent extends LightningElement {
    selectedRecId;
    changeMode = 'readonly';
    fields = [nameField, phoneField, sourceField, typeField, accNumberField];
    eventFired(event){ 
        this.selectedRecId = event  ;   
    }
    connectedCallback() { 
        this.register();
    }
    @api
    register(){
        pubsub.register('recordIdVal', this.eventFired.bind(this)); 
    }
    handleEditClick(){
        this.changeMode = 'edit';
    }
    handleCancel(){
        this.changeMode = 'readonly';
    }
    handleSuccess(event) {
        this.changeMode = 'readonly';
        const evt = new ShowToastEvent({
            title: "Account updated",
            variant: "success"
        });
        this.dispatchEvent(evt);
        pubsub.fire('updateddata',event);
    }
}