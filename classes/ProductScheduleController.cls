public class ProductScheduleController {
  @AuraEnabled
  public static List<OpportunityLineItem> searchForProducts(String searchProdText, Id oppId) {
    System.debug('---------searchProdText'+searchProdText);
    System.debug('---------oppId='+oppId);
    List<OpportunityLineItem> opps =
     [SELECT Id, Product2.Name, Product2.KOR_ASIN__C, Quantity, Product2.ProductCode
      FROM OpportunityLineItem
      WHERE (Product2.Name LIKE: searchProdText OR Product2.KOR_ASIN__C LIKE: searchProdText) AND OpportunityId =:
        oppId];
     System.debug('---------opps'+opps);
     return opps;
  }
  @AuraEnabled
  public static List<OpportunityLineItem> getOppLineItems(Id oppId) {
    List<OpportunityLineItem> oppLineItems =
    [SELECT Id, Product2.Name, Product2.KOR_ASIN__C, Quantity, Product2.ProductCode
     FROM OpportunityLineItem
     WHERE OpportunityId =:oppId];
    System.debug('---------oppLineItems'+oppLineItems);
    return oppLineItems;
  }
  
  @AuraEnabled
  public static List<Opportunity_LineItem_Schedule_Shadow__c> getOppLineSche(Id selOLI) {
    System.debug('---------selOLI'+selOLI);
    List<Opportunity_LineItem_Schedule_Shadow__c> prodScheLists =
    [SELECT Id,Product__r.Name, Quantity_Without_Probability__c, Date__c
    FROM Opportunity_LineItem_Schedule_Shadow__c
    WHERE Opportunity_Line_Item_Id__c =: selOLI
    ORDER by Date__c ASC];
    System.debug('---------prodScheLists'+prodScheLists);
    return prodScheLists;
  }
  @AuraEnabled
  public static List<Opportunity_LineItem_Schedule_Shadow__c> saveProdSche(
    List<Opportunity_LineItem_Schedule_Shadow__c> prodSchList){
  
    List<Opportunity_LineItem_Schedule_Shadow__c> insertRec = new List<Opportunity_LineItem_Schedule_Shadow__c>();
    List<Opportunity_LineItem_Schedule_Shadow__c> updateRec = new List<Opportunity_LineItem_Schedule_Shadow__c>();
    List<Opportunity_LineItem_Schedule_Shadow__c> retunRec = new List<Opportunity_LineItem_Schedule_Shadow__c>();
  
    Set<Id> oliIds = new Set<Id>();
    Map<Id, OpportunityLineItem> mapOliItems = new Map<Id, OpportunityLineItem>();
    
    for (Opportunity_LineItem_Schedule_Shadow__c olss : prodSchList) {
      if (olss.Id != null) {
        updateRec.add(olss);
      } else {
        System.debug('---------olss='+olss);
        if (olss.Opportunity_Line_Item_Id__c != null) {
          oliIds.add(olss.Opportunity_Line_Item_Id__c);
          olss.IS_Active__c = true;
          insertRec.add(olss);
        }
      }
    }
    if (!oliIds.isEmpty()) {
      for (OpportunityLineItem oliItem : [
        SELECT Id, Product2Id, OpportunityId, Opportunity.AccountId
        FROM OpportunityLineItem
        WHERE Id IN : oliIds]) {
  
        mapOliItems.put(oliItem.Id, oliItem);
      }
    }
    
    for (Opportunity_LineItem_Schedule_Shadow__c olss : insertRec) {
      if (olss.Opportunity_Line_Item_Id__c != null && mapOliItems.containsKey(olss.Opportunity_Line_Item_Id__c)) {
  
        OpportunityLineItem oliItem = mapOliItems.get(olss.Opportunity_Line_Item_Id__c);
        olss.Account__c = oliItem.Opportunity.AccountId;
        olss.Opportunity__c = oliItem.OpportunityId;
        olss.Product__c = oliItem.Product2Id;
      }
    }
    if (!updateRec.isEmpty()) {
      update updateRec;
    }
    if (!insertRec.isEmpty()) {
      insert insertRec;
    }
    retunRec.addAll(updateRec);
    retunRec.addAll(insertRec);
  
    return retunRec;
  }
}