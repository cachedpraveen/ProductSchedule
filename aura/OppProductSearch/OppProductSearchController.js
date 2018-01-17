({
    // this function search the product based on text
    searchProduct: function(component, event, helper) {
        var searchProdText = component.get('v.searchProdText');
        var oppId = component.get('v.oppId');

        if (searchProdText.length > 0) {
            var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            var searchForProdAction = component.get('c.searchForProducts');
            searchForProdAction.setParams({
                searchProdText: searchProdText,
                oppId: oppId
            });
            //searchForProdAction.setParams ({oppId : oppId});
            searchForProdAction.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var OLIs = response.getReturnValue();
                    component.set("v.OLIs", OLIs);
                }
            });
            $A.enqueueAction(searchForProdAction);
        } else {
            component.set("v.OLIs", null);
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
    },
    handleOLIValueChange: function(component, event, helper) {
        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-show');
        $A.util.removeClass(forclose, 'slds-hide');

        var searchRes = component.find("searchRes");
        $A.util.addClass(searchRes, 'slds-is-close');
        $A.util.removeClass(searchRes, 'slds-is-open');

        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-hide');
        $A.util.removeClass(lookUpTarget, 'slds-show');
        component.getEvent("updateProdSchBtn").setParams({
            "saveBtnDis": true,
            "nextBtnDis": false,
            "backBtnDis": true,
            "pageBlock": event.getParam("pageBlock")
        }).fire();
    },
    handleSelComEvent: function(component, event, helper) {
        component.set("v.selectedOLI", event.getParam("OLI"));
        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-show');
        $A.util.removeClass(forclose, 'slds-hide');

        var searchRes = component.find("searchRes");
        $A.util.addClass(searchRes, 'slds-is-close');
        $A.util.removeClass(searchRes, 'slds-is-open');

        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-hide');
        $A.util.removeClass(lookUpTarget, 'slds-show');

        component.getEvent("updateProdSchBtn").setParams({
            "saveBtnDis": true,
            "nextBtnDis": false,
            "backBtnDis": true,
            "pageBlock": event.getParam("pageBlock")
        }).fire();


    },
    // function for clear the Record Selection
    clear: function(component, event, heplper) {
        component.set("v.searchProdText", null);
        component.set("v.OLIs", null);
        component.set("v.selectedOLI", null);

        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-hide');
        $A.util.removeClass(forclose, 'slds-show');

        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-show');
        $A.util.removeClass(lookUpTarget, 'slds-hide');

        component.getEvent("updateProdSchBtn").setParams({
            "saveBtnDis": true,
            "nextBtnDis": true,
            "backBtnDis": true,
            "pageBlock": 'oppLineItems'
        }).fire();
    }
})