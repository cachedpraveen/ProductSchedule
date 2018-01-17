({
    init: function(component, event, helper) {
        var prodDateStg = component.get('v.prodSchItem.Date__c');
        var today = new Date();
        var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var prodDate = new Date(prodDateStg);

        if (todayDate > prodDate) {
            component.set('v.pastDue', true);
        } else {
            component.set('v.pastDue', false);
        }
    },
    handleDeleteRecord: function(component, event, helper) {
        component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult) {
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                // record is deleted
                console.log("Record is deleted.");
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        }));
    },
    removeRow: function(component, event, helper) {
        component.getEvent("removeProdSchRow").setParams({
            "rowIndex": component.get('v.rowIndex')
        }).fire();
    },
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if (eventParams.changeType === "CHANGED") {
            // record is changed
        } else if (eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if (eventParams.changeType === "REMOVED") {
            component.getEvent("updateProdSchList").fire();
        } else if (eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    },
    validateRow: function(component, event) {
        var inputFieldQan = component.find('prod_Sch_Quantity');
        var qanValue = inputFieldQan.get('v.value');
        var disableSave = false;
        if (qanValue == '' || qanValue == null || qanValue < 0) {
            inputFieldQan.set("v.errors", [{
                message: "Quantity can't be null or Negative: "
            }]);
            disableSave = true;
            //component.getEvent("updateSaveBtn").setParams({"saveBtnDis" : true }).fire();
        } else {
            inputFieldQan.set("v.errors", null);
            if (!disableSave) {
                disableSave = false;
            }
            //component.getEvent("updateSaveBtn").setParams({"saveBtnDis" : false }).fire();
        }
        var inputFieldDate = component.find('prod_Sch_Date');
        var dateValue = inputFieldDate.get('v.value');
        if (dateValue == '' || dateValue == null) {
            inputFieldDate.set("v.errors", [{
                message: "Date can't be null: "
            }]);
            disableSave = true;
            //component.getEvent("updateSaveBtn").setParams({"saveBtnDis" : true }).fire();
        } else {
            inputFieldDate.set("v.errors", null);
            if (!disableSave) {
                disableSave = false;
            }
            //component.getEvent("updateSaveBtn").setParams({"saveBtnDis" : false }).fire();
        }
        var today = new Date();
        var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (todayDate > new Date(dateValue)) {
            inputFieldDate.set("v.errors", [{
                message: "Date can't be Past: "
            }]);
        }
        /*component.getEvent("updateDurtyRecIds").setParams({
            "recordId": "a0N0t000000BhXKEA0"
        }).fire();*/
        component.getEvent("validateSaveProd").setParams({
            "validateSave": true,
            "saveBtnDis": disableSave
        }).fire();
    },

})