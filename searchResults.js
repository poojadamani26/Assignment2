import { LightningElement, wire, api } from 'lwc';
import pubsub from 'c/pubsub' ; 
import getAccounts from '@salesforce/apex/Assignment2Controller.getAccRec';
import { refreshApex } from '@salesforce/apex';
export default class SearchResults extends LightningElement {
    wiredaccRefresh;
    accountRec;
    @api accType;
    @wire(getAccounts, { typeVal: '$accType' })
    accountsData(result){
        this.wiredaccRefresh = result;
        const {data, error} = result;
        if(data){
            this.refreshHandle();
        }
        else if(error){
            console.log("error"+error);
        }
    } 
    connectedCallback() {
        this.register();
    }
    @api
    register(){
        pubsub.register('updateddata', this.refreshHandle.bind(this)); 
    }
    refreshHandle(){
        refreshApex(this.wiredaccRefresh)
        .then(() => {
            this.accountRec = this.wiredaccRefresh.data;
        });
    }
}