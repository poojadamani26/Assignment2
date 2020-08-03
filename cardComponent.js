import { LightningElement, api } from 'lwc';
import pubsub from 'c/pubsub' ;
export default class CardComponent extends LightningElement {
    @api accountData;
    handleDetailClick(event){
        pubsub.fire('recordIdVal',event.target.value);
    }
}