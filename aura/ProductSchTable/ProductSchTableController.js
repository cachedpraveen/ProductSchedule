/**
 * Created by pke on 11/23/17.
 */
({
    init: function(component, event, helper) {
        var varOLISel = component.get("v.selectedOLI");
        var url = window.location.href;
        var oppId = url.substring(url.indexOf("/sObject/") + 9, url.indexOf("/view"));
        component.set("v.oppId", oppId);
        if (oppId != null) {
            var action = component.get('c.getOppLineItems');
            action.setParams({
                oppId: oppId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var oppLineItems = response.getReturnValue();
                    component.set("v.oppLineItems", oppLineItems);
                }
            });
            $A.enqueueAction(action);
        }
    },
    handleSelOLIEvent: function(component, event, helper) {
        var varOLISel = component.get("v.selectedOLI");
        if (varOLISel != null) {
            var action = component.get('c.getOppLineSche');
            action.setParams({
                selOLI: varOLISel.Id
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var prodScheLists = response.getReturnValue();
                    component.set("v.prodSchList", prodScheLists);
                }
            });
            $A.enqueueAction(action);
        }
    },
    backClick: function(component, Event, helper) {
        component.getEvent("updateProdSchBtn").setParams({
            "saveBtnDis": true,
            "nextBtnDis": false,
            "backBtnDis": true,
            "pageBlock": 'oppLineItems'
        }).fire();
    },
    nextClick: function(component, Event, helper) {
        component.getEvent("updateProdSchBtn").setParams({
            "saveBtnDis": false,
            "nextBtnDis": true,
            "backBtnDis": false,
            "pageBlock": 'prodSchItems'
        }).fire();
    },
    addRow: function(component, event, helper) {
        helper.createObjectData(component, event);
    },
    removeRow: function(component, event, helper) {
        var rowItemList = component.get("v.prodSchList");
        var rowIndex = event.getParam("rowIndex");
        rowItemList.splice(rowIndex, 1);
        component.set("v.prodSchList", rowItemList);
    },
    updateDurtyRecIds: function(component, event, helper) {
        var dutryRecIds = [];
        dutryRecIds = component.get("v.dutryRecIds");

        dutryRecIds.push(event.getParam("recordId"));
        component.set("v.dutryRecIds", dutryRecIds);
    },
    Save: function(component, event, helper) {
        if (helper.validateSave(component, event)) {
            var action = component.get("c.saveProdSche");
            action.setParams({
                "prodSchList": component.get("v.prodSchList")
            });
            // set call back
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.getEvent("updateProdSchBtn").setParams({
                        "saveBtnDis": true,
                        "nextBtnDis": false,
                        "backBtnDis": true,
                        "pageBlock": 'oppLineItems'
                    }).fire();
                }
            });
            $A.enqueueAction(action);
        }
    },
    validateSave: function(component, event, helper) {
        helper.validateSave(component, event)
    },
    updateScroll: function(component, event, helper) {
        var scroller = component.find("scroller");
        scroller.scrollTo("bottom");
    }
})