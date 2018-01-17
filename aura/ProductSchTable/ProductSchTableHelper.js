/**
 * Created by pke on 11/24/17.
 */
({
    createObjectData: function(component, event) {
        var rowItemList = component.get("v.prodSchList");
        rowItemList.unshift({
            'sobjectType': 'Opportunity_LineItem_Schedule_Shadow__c',
            'Quantity_Without_Probability__c': '0',
            'Date__c': '',
            'Opportunity_Line_Item_Id__c': component.get("v.selectedOLI").Id,
        });
        component.set("v.prodSchList", rowItemList);
        component.set("v.prodName", component.get("v.selectedOLI").Product2.Name);
    },
    updatefinishBtnDis: function(component, event) {

    },
    // helper function for check if first Name is not null/blank on save
    validateSave: function(component, event) {
        var isValid = true;
        var prodSchList = component.get("v.prodSchList");
        var selectedOLI = component.get("v.selectedOLI");
        var totalQan = 0;
        var msg = '';
        var dutryRecIds = [];
        dutryRecIds = component.get("v.dutryRecIds");
        var today = new Date();
        var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        for (var indexVar = 0; indexVar < prodSchList.length; indexVar++) {
            //if (dutryRecIds && dutryRecIds.lastIndexOf(prodSchList[indexVar].Id) >= 0) {
            if ((prodSchList[indexVar].Quantity_Without_Probability__c == '' || prodSchList[indexVar].Quantity_Without_Probability__c == null ||
                    prodSchList[indexVar].Quantity_Without_Probability__c <= 0)) {
                isValid = false;
                //alert('Quantity Can\'t be Blank on Row Number ' + (indexVar + 1));
                msg += 'Quantity Can\'t be Null or Negative on Row Number For Item' + (indexVar + 1) + '<br>';
            } else {
                totalQan += prodSchList[indexVar].Quantity_Without_Probability__c;
            }
            if (prodSchList[indexVar].Date__c == '' || prodSchList[indexVar].Date__c == null) {
                isValid = false;
                msg += 'Date Can\'t be Blank on Row Number For Item' + (indexVar + 1) + '<br>';
            } else if (dutryRecIds.lastIndexOf(prodSchList[indexVar].Id) >= 0 &&
                todayDate > new Date(prodSchList[indexVar].Date__c)) {

            }
        }
        if (totalQan > selectedOLI.Quantity) {
            isValid = false;
            msg += 'Quantity Can\'t be more than ' + selectedOLI.Quantity + '<br>';
        }
        if (msg) {
            isValid = false;
            component.set("v.message", msg);
            component.set("v.messageType", 'error');
            component.set("v.finishBtnDis", true);
        } else {
            component.set("v.message", msg);
            component.set("v.messageType", null);
            component.set("v.finishBtnDis", event.getParam("saveBtnDis"));
        }
        return isValid;
    },
})