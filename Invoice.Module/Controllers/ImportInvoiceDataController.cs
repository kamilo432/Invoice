using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using DevExpress.Persistent.Base;

namespace Invoice.Module.Controllers
{
    public class ImportInvoiceDataController : ViewController
    {
        public ImportInvoiceDataController()
        {
            TargetViewType = ViewType.DetailView;
            TargetObjectType = typeof(BusinessObjects.InvoiceData);
            
            SimpleAction importInvoiceData = new SimpleAction(this, "ClearTaskAction", PredefinedCategory.View)
            {
                Caption = "Get data from GUS",
                ImageName = "EnableSearch"
            };
            importInvoiceData.SelectionDependencyType = SelectionDependencyType.RequireMultipleObjects;

            ApiConnection apiConnection = new ApiConnection();

            importInvoiceData.Execute += apiConnection.Connection;
        }
    }
}

