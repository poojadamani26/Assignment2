public class Assignment2Controller {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccRec(String typeVal)
    {
        return [SELECT id, name, type, Phone, AccountSource, AccountNumber FROM account where type = :typeVal];
    }
}