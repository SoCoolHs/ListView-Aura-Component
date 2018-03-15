({
    fetchDepartments : function(component,next,prev,offset) {
          offset = offset || 0;
        console.log('Input Offset' + offset);
        var action = component.get("c.getDepartments");
        action.setParams({
            "next" : next,
            "prev" : prev,
            "off" : offset            
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('Offset Response'+ response.getReturnValue().offst)
                component.set("v.Departments", response.getReturnValue().dept);
              	component.set('v.next',response.getReturnValue().hasnext);
              	component.set('v.prev',response.getReturnValue().hasprev);
                component.set('v.offset',response.getReturnValue().offst);
                
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    createExpense: function(component, department, transactionType) {
        console.log('department')
        console.log(department)
        var action = component.get("c.saveDepartment");
        action.setParams({
            "Department": department
        });
        action.setCallback(this, function(response){
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            console.log('Outside Success')
            if (state === "SUCCESS") {
                toastEvent.setParams({
                    "title": "Inserted Record!",
                    "message":response.getReturnValue(),
                    "type": "success"
                });
                toastEvent.fire();
                var departments = component.get("v.Departments");
                component.set("v.isOpen", false);
            }
        });
        $A.enqueueAction(action);
    },
    deleteDepartmentByName: function(component, name, next, prev, offset) {
         var toastEvent = $A.get("e.force:showToast");
        var action = component.get("c.deleteDepartmentByName");
        console.log(name+ next+ prev+ offset);
        action.setParams({
            "name": name,
            "next" : next,
            "prev" : prev,
            "off" : offset 
        });
        
        action.setCallback(this, function(response){
           var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            if (state === "SUCCESS") {
                 toastEvent.setParams({
                    "title": "Deleted Record!",
                    "message":response.getReturnValue(),
                    "type": "success"
                });
                toastEvent.fire();
                component.set("v.Departments", response.getReturnValue());
                component.set("v.isOpen", false);
            }
        });
        $A.enqueueAction(action);
    }
})
