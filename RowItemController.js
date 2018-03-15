({
    
    removeRow : function(component, event, helper){
        component.getEvent("DeleteEvent").setParams({"DepartmentInstance" : component.get("v.DepartmentInstance") }).fire();
    },
    editRow : function(component, event, helper){
        var cmpTarget = component.find('editRow');
        $A.util.addClass(cmpTarget, 'hide');
        var sourceTarget = component.find('blankRow');
        $A.util.removeClass(sourceTarget, 'hide');
        component.getEvent("EvenEdit").setParams({"DepartmentInstance" : component.get("v.DepartmentInstance") }).fire();
    },
    editClick : function(component, event, helper){
        var cmpTarget = component.find('editRow');
        $A.util.removeClass(cmpTarget, 'hide');
        var sourceTarget = component.find('blankRow');
        $A.util.addClass(sourceTarget, 'hide');
        
    },
    cancelRow: function(component, event, helper){
        var cmpTarget = component.find('editRow');
        $A.util.addClass(cmpTarget, 'hide');
        var sourceTarget = component.find('blankRow');
        $A.util.removeClass(sourceTarget, 'hide');
    }
})
