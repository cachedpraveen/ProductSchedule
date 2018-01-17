/**
 * Created by pke on 11/22/17.
 */
({
    selectedOppLineItem: function(component, event, helper) {
        var selectedOLI = component.get("v.OLI");
        var compEvent = component.getEvent("varOLISelEvent").setParams({
            "OLI": selectedOLI,
            "pageBlock": "oppLineItems"
        });
        compEvent.fire();
    }
})